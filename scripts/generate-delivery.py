"""Generate an academic PDF; never invent a photo, repository, APK URL or QR.
Requirements: pip install reportlab pillow qrcode
Example: python scripts/generate-delivery.py --repository REAL_URL --apk-url REAL_URL --output entrega.pdf
"""
import argparse
from pathlib import Path
from urllib.request import Request, urlopen
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from reportlab.lib.pagesizes import A4
from PIL import Image, ImageOps
import qrcode

parser = argparse.ArgumentParser()
parser.add_argument('--repository', default='')
parser.add_argument('--apk-url', default='')
parser.add_argument('--photo', default='assets/images/profile.jpg')
parser.add_argument('--output', default='ITLA-Toolbox-Entrega-PENDIENTE.pdf')
args = parser.parse_args()
photo = Path(args.photo)
for link in [args.repository, args.apk_url]:
    if link:
        if not link.startswith('https://'):
            raise ValueError('Se requiere una URL HTTPS real y pública.')
        with urlopen(Request(link, method='HEAD', headers={'User-Agent':'ITLA-Toolbox-Delivery'}), timeout=30) as response:
            if response.status != 200:
                raise ValueError('Enlace no accesible: '+link)
pending = not photo.exists() or not args.repository or not args.apk_url
target = Path(args.output)
target.parent.mkdir(parents=True, exist_ok=True)
c=canvas.Canvas(str(target),pagesize=A4)
w,h=A4
navy=HexColor('#102344');blue=HexColor('#2463EB');muted=HexColor('#60718B')
c.setTitle('ITLA Toolbox - Entrega académica' + (' PENDIENTE' if pending else ''))
c.setAuthor('Esteban Josué Mata Acosta')
c.setFillColor(navy);c.rect(0,h-165,w,165,fill=1,stroke=0)
c.setFillColor(HexColor('#93BCFF'));c.setFont('Helvetica-Bold',10);c.drawString(42,h-42,'INSTITUTO TECNOLÓGICO DE LAS AMÉRICAS')
c.setFillColor(HexColor('#FFFFFF'));c.setFont('Helvetica-Bold',29);c.drawString(42,h-90,'ITLA Toolbox')
c.setFont('Helvetica',14);c.drawString(42,h-117,'Herramientas Inteligentes | Aplicación Android')
c.setFillColor(blue);c.setFont('Helvetica-Bold',10);c.drawString(42,h-192,'PLANTILLA PENDIENTE DE COMPLETAR' if pending else 'ENTREGA ACADÉMICA')
c.setFillColor(navy);c.setFont('Helvetica-Bold',18);c.drawString(42,h-225,'Esteban Josué Mata Acosta')
c.setFont('Helvetica',12)
for i,t in enumerate(['Nombre: Esteban Josué','Apellidos: Mata Acosta','Matrícula: 20241860','Área: Desarrollo de software y aplicaciones móviles']):
    c.drawString(42,h-251-i*21,t)
if photo.exists():
    pic=ImageOps.fit(Image.open(photo).convert('RGB'),(300,300))
    c.drawImage(ImageReader(pic),w-150,h-320,105,105)
else:
    c.setStrokeColor(HexColor('#DCE4EF'));c.roundRect(w-150,h-320,105,105,10,stroke=1,fill=0)
    c.setFillColor(muted);c.setFont('Helvetica',10)
    c.drawCentredString(w-97,h-263,'FOTOGRAFÍA')
    c.drawCentredString(w-97,h-280,'PENDIENTE')
y=h-370
for label,url in [('REPOSITORIO DE CÓDIGO',args.repository),('DESCARGA PÚBLICA DEL APK',args.apk_url)]:
    c.setFillColor(navy);c.setFont('Helvetica-Bold',11);c.drawString(42,y,label)
    c.setFillColor(blue if url else muted);c.setFont('Helvetica',9)
    if url:
        # Keep the URL readable and clickable, wrapping only at path boundaries.
        parts=url.split('/');lines=[];line=''
        for part in parts:
            next_line=line+('/' if line else '')+part
            if c.stringWidth(next_line,'Helvetica',9)>w-84:
                lines.append(line+'/');line=part
            else:line=next_line
        lines.append(line)
        for offset,text in enumerate(lines):c.drawString(42,y-21-offset*14,text)
        c.linkURL(url,(42,y-40,w-42,y-8),relative=0)
    else:c.drawString(42,y-21,'Pendiente de publicación y verificación.')
    y-=80
if args.apk_url:
    qr=qrcode.make(args.apk_url).convert('RGB')
    c.drawImage(ImageReader(qr),42,95,125,125)
    c.setFillColor(navy);c.setFont('Helvetica-Bold',12);c.drawString(185,193,'Escanea para descargar el APK')
    c.setFillColor(muted);c.setFont('Helvetica',10);c.drawString(185,171,'El código QR contiene el enlace público verificado.')
    c.drawString(185,154,'La aplicación requiere Android 7.0 o superior.')
else:
    c.setFillColor(muted);c.setFont('Helvetica',11);c.drawString(42,193,'QR pendiente: se generará con una URL pública real del APK.')
if pending:
    c.setFillColor(HexColor('#A82736'));c.setFont('Helvetica-Bold',10)
    c.drawString(42,68,'No presentar como entrega final hasta completar los datos pendientes.')
c.setFillColor(muted);c.setFont('Helvetica',9);c.drawString(42,35,'ITLA Toolbox | Proyecto académico');c.drawRightString(w-42,35,'1 / 1')
c.save();print(target)
