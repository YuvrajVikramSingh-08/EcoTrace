import html2canvas from 'html2canvas';

/**
 * Capture an HTML element as a PNG and trigger download.
 * @param {HTMLElement} element
 * @param {string} filename
 * @returns {Promise<{ data: boolean, error: string|null }>}
 */
export async function downloadAsImage(
  element,
  filename = 'ecotrace-achievement.png'
) {
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#0a0a0a',
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();

    return { data: true, error: null };
  } catch (error) {
    return {
      data: false,
      error: error.message || 'Failed to generate image.',
    };
  }
}
