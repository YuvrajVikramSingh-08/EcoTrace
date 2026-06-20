import { useState, useEffect, useCallback } from 'react';
import {
  doc, setDoc, getDocs, collection, query, orderBy,
  limit, serverTimestamp, deleteDoc,
} from 'firebase/firestore';
import { db } from '../services/firebase.js';
import { useAuth } from './useAuth.js';
import { chatWithEcoCoach } from '../services/geminiService.js';

export function useEcoCoach() {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async () => {
    if (!currentUser) return;
    try {
      const ref = collection(db, 'users', currentUser.uid, 'chatHistory');
      const q = query(ref, orderBy('timestamp', 'asc'), limit(50));
      const snap = await getDocs(q);
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const sendMessage = useCallback(async (text, userContext) => {
    if (!currentUser || !text.trim()) return;
    setSending(true);
    setError(null);

    const userMsg = {
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    const tempMessages = [...messages, userMsg];
    setMessages(tempMessages);

    try {
      const userMsgRef = doc(collection(db, 'users', currentUser.uid, 'chatHistory'));
      await setDoc(userMsgRef, {
        ...userMsg,
        timestamp: serverTimestamp(),
      });

      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const { data: reply, error: aiError } = await chatWithEcoCoach(
        text,
        history,
        userContext
      );

      if (aiError) {
        setError(aiError);
        setSending(false);
        return;
      }

      const aiMsg = {
        role: 'model',
        content: reply,
        timestamp: new Date(),
      };

      const aiMsgRef = doc(collection(db, 'users', currentUser.uid, 'chatHistory'));
      await setDoc(aiMsgRef, {
        ...aiMsg,
        timestamp: serverTimestamp(),
      });

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }, [currentUser, messages]);

  const clearChat = useCallback(async () => {
    if (!currentUser) return;
    const ref = collection(db, 'users', currentUser.uid, 'chatHistory');
    const snap = await getDocs(ref);
    const deletes = snap.docs.map((d) => deleteDoc(d.ref));
    await Promise.all(deletes);
    setMessages([]);
  }, [currentUser]);

  return {
    messages,
    loading,
    sending,
    error,
    sendMessage,
    clearChat,
    refetch: fetchHistory,
  };
}
