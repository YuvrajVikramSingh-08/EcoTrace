import { useState, useContext } from 'react';
import { UserDataContext } from '../contexts/UserDataContext.jsx';
import { useDiary } from '../hooks/useDiary.js';
import { useGamification } from '../hooks/useGamification.js';
import { useToast } from '../hooks/useToast.js';
import { parseDiaryEntry } from '../services/geminiService.js';
import DiaryInput from '../components/diary/DiaryInput.jsx';
import DiaryEntry from '../components/diary/DiaryEntry.jsx';
import DiaryHistory from '../components/diary/DiaryHistory.jsx';
import ConfirmDialog from '../components/shared/ConfirmDialog.jsx';
import LoadingSpinner from '../components/shared/LoadingSpinner.jsx';

function DiaryPage() {
  const { userData } = useContext(UserDataContext);
  const { entries, todayEntry, loading, addEntry, deleteEntry } = useDiary();
  const { checkAndUnlockBadges } = useGamification();
  const { showToast } = useToast();

  const [analysing, setAnalysing] = useState(false);
  const [parsedResult, setParsedResult] = useState(null);
  const [rawText, setRawText] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  async function handleAnalyse(text) {
    setAnalysing(true);
    setRawText(text);
    setParsedResult(null);

    const userProfile = {
      dietType: userData?.dietType || 'non-vegetarian',
      vehicleType: userData?.vehicleType || 'car-petrol',
      location: userData?.location || 'India',
    };

    const { data, error } = await parseDiaryEntry(text, userProfile);

    if (error) {
      showToast(error, 'error');
      setAnalysing(false);
      return;
    }

    const totalCO2Kg = data.reduce((sum, a) => sum + a.co2Kg, 0);
    setParsedResult({ activities: data, totalCO2Kg });
    setAnalysing(false);
  }

  async function handleSave() {
    if (!parsedResult) return;

    try {
      const xp = await addEntry(rawText, parsedResult.activities, parsedResult.totalCO2Kg);
      showToast(`+${xp} XP — Diary saved!`, 'success');

      await checkAndUnlockBadges({
        diaryEntryCount: (entries.length || 0) + 1,
        currentStreak: (userData?.currentStreak || 0) + 1,
        totalCarbonSavedKg: userData?.totalCarbonSavedKg || 0,
        todayCO2Kg: parsedResult.totalCO2Kg,
        todayCategories: parsedResult.activities,
      });

      setParsedResult(null);
      setRawText('');
    } catch {
      showToast('Failed to save entry. Please try again.', 'error');
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    await deleteEntry(deleteId);
    setDeleteId(null);
    showToast('Entry deleted.', 'info');
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-100 mb-1">EcoDiary</h1>
        <p className="text-sm text-gray-400">
          Describe your day in plain English. AI will calculate your carbon footprint.
        </p>
      </div>

      {/* Show today's entry or input form */}
      {todayEntry && !parsedResult ? (
        <div>
          <p className="text-sm text-gray-400 mb-3">Today&apos;s entry:</p>
          <DiaryEntry
            entry={todayEntry}
            onDelete={() => setDeleteId(todayEntry.id)}
          />
          <p className="text-xs text-gray-600 mt-2">
            You can update today&apos;s entry by analysing a new description.
          </p>
          <div className="mt-4">
            <DiaryInput
              onAnalyse={handleAnalyse}
              loading={analysing}
              existingText=""
            />
          </div>
        </div>
      ) : (
        <DiaryInput
          onAnalyse={handleAnalyse}
          loading={analysing}
          existingText={rawText}
        />
      )}

      {/* Parsed results */}
      {parsedResult && (
        <DiaryEntry
          entry={parsedResult}
          onSave={handleSave}
          showSave={true}
        />
      )}

      {/* History */}
      <DiaryHistory
        entries={entries}
        onDelete={(id) => setDeleteId(id)}
      />

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete entry?"
        message="This entry will be permanently deleted. XP earned from this entry will be kept."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}

DiaryPage.propTypes = {};

export default DiaryPage;
