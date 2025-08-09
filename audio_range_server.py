import http.server
import socketserver
import os
import sys
import http.server

class AudioRangeRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Handle Vite client request
        if self.path == '/@vite/client':
            self.send_response(200)
            self.send_header('Content-type', 'application/javascript')
            self.end_headers()
            self.wfile.write(b'// Empty Vite client response')
            return
        
        # 只处理音频文件
        if not self.path.endswith('.mp3'):
            # 对于非音频文件，使用默认处理
            super().do_GET()
            return

        path = self.translate_path(self.path)
        try:
            with open(path, 'rb') as f:
                fs = os.fstat(f.fileno())
                file_size = fs[6]
                ctype = 'audio/mpeg'

                # 处理Range请求
                if 'Range' in self.headers:
                    ranges = self.headers['Range'].split('=')[1]
                    start, end = ranges.split('-')
                    start = int(start) if start else 0
                    end = int(end) if end else file_size - 1

                    if start >= file_size:
                        self.send_error(416, "Requested Range Not Satisfiable")
                        return

                    if end >= file_size:
                        end = file_size - 1

                    # 发送部分内容响应
                    self.send_response(206)
                    self.send_header("Content-Range", f"bytes {start}-{end}/{file_size}")
                    self.send_header("Content-Length", str(end - start + 1))
                    f.seek(start)
                    content = f.read(end - start + 1)
                else:
                    # 发送完整内容响应
                    self.send_response(200)
                    self.send_header("Content-Length", str(file_size))
                    content = f.read()

                # 发送通用头信息
                self.send_header("Content-type", ctype)
                self.send_header("Last-Modified", self.date_time_string(fs.st_mtime))
                self.send_header("Accept-Ranges", "bytes")
                self.end_headers()

                # 发送内容
                self.wfile.write(content)
        except OSError:
            self.send_error(404, "File not found")
            return

# 设置服务器
PORT = 8000
handler = AudioRangeRequestHandler

try:
    with socketserver.TCPServer(('', PORT), handler) as httpd:
        print(f"音频Range服务器运行在 http://localhost:{PORT}/")
        httpd.serve_forever()
except KeyboardInterrupt:
    print("服务器被用户停止")
    sys.exit(0)