#!/usr/bin/env python3
"""
Convertit un PDF en images pour le portfolio.
Usage: python3 pdf-to-images.py <chemin-pdf> <dossier-destination>
Exemple: python3 pdf-to-images.py "PLAQUETTE INVICTUS.pdf" realisations/branding/invictus-agency/
"""
import sys
import os

try:
    import fitz  # PyMuPDF
except ImportError:
    print("Installation de PyMuPDF...")
    os.system("pip install --break-system-packages pymupdf")
    import fitz

def convert_pdf(pdf_path, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    doc = fitz.open(pdf_path)
    
    print(f"📄 PDF: {pdf_path}")
    print(f"📁 Sortie: {output_dir}")
    print(f"📊 Pages: {len(doc)}")
    
    for i, page in enumerate(doc):
        # Render at high quality (2x zoom for crisp images)
        mat = fitz.Matrix(2, 2)
        pix = page.get_pixmap(matrix=mat)
        
        if i == 0:
            filename = "cover.jpg"
        else:
            filename = f"{i:02d}.jpg"
        
        output_path = os.path.join(output_dir, filename)
        pix.save(output_path)
        print(f"  ✅ {filename} ({pix.width}x{pix.height})")
    
    doc.close()
    print(f"\n🎉 {len(doc)} pages converties avec succès !")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 pdf-to-images.py <chemin-pdf> <dossier-destination>")
        sys.exit(1)
    
    convert_pdf(sys.argv[1], sys.argv[2])
