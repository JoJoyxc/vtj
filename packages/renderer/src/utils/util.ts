export function toString(value: any) {
  return typeof value === 'string' ? value : JSON.stringify(value);
}

export function adoptedStyleSheets(global: Window, id: string, css: string) {
  const CSSStyleSheet = (global as any).CSSStyleSheet;
  // chrome > 71 才支持 replaceSync
  if (CSSStyleSheet.prototype.replaceSync) {
    const styleSheet = new CSSStyleSheet();
    styleSheet.id = id;
    styleSheet.replaceSync(css);
    const doc: any = global.document;
    const adoptedStyleSheets = doc.adoptedStyleSheets;
    const sheets = Array.from(adoptedStyleSheets).filter(
      (n: any) => n.id !== id
    );
    doc.adoptedStyleSheets = [...sheets, styleSheet];
  } else {
    const doc = global.document;
    let styleSheet = doc.getElementById(id);
    if (styleSheet) {
      styleSheet.innerHTML = css;
    } else {
      styleSheet = doc.createElement('style');
      styleSheet.id = id;
      styleSheet.innerHTML = css;
      doc.head.appendChild(styleSheet);
    }
  }
}

export async function loadCss(id: string, url: string) {
  const css = await window
    .fetch(url)
    .then((res) => res.text())
    .catch(() => '');
  if (css) {
    adoptedStyleSheets(window, id, css);
  }
}
