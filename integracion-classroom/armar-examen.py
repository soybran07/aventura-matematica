"""Regenera el paquete de Apps Script a partir de sus fuentes versionadas."""
import json
from pathlib import Path
r = Path(__file__).resolve().parent.parent
i = r / 'integracion-classroom'
p = i / 'Codigo.gs'
ruta = (r / 'ruta.js').read_text()
def read(path):
    return (r / path).read_text()
html = read('examen/index.html').replace('<head>', '<head><base target="_top"><script>window.BALAM_EXAMEN=true;</script>')
html = html.replace('<link rel="stylesheet" href="estilo.css">', '<style>'+read('examen/estilo.css')+'</style>')
for name in ('banco.js', 'juego.js'):
    html = html.replace(f'<script src="{name}"></script>', '<script>'+read('examen/'+name)+'</script>')
server = read('integracion-classroom/servidor.gs')
bank = read('sumas/datos.js')
mul = read('multiplicacion/datos.js')
client_files = dict(CLASSROOM_BRIDGE='integracion-classroom/bridge.js', RUTA_CLIENT='ruta.js', REMOTE_GAME='integracion-classroom/cliente-evaluacion.js', MULT_DATA='multiplicacion/datos.js', MULT_ART='multiplicacion/arte.js', MULT_GAME='multiplicacion/juego.js')
part = [server, ruta, bank, read('sumas/piramide.js'), mul, read('integracion-classroom/multiplicacion-adaptador.gs'), read('examen/banco.js'), read('integracion-classroom/examen.gs')]
part += [f'const {k} = {json.dumps(read(v), ensure_ascii=False)};' for k,v in client_files.items()]
part += [f'const EXAMEN_HTML = {json.dumps(html, ensure_ascii=False)};']
part += ['const TEMPLO_CSS = '+json.dumps(read('sumas/estilo.css').split('/* Cámara compacta del templo */')[1],ensure_ascii=False)+';']
part += ['const TEMPLO_CLIENT = '+json.dumps(read('sumas/piramide.js')+'\n'+read('sumas/interior.js'),ensure_ascii=False)+';']
p.write_text('\n\n'.join(part)+'\n')
