import re
import os

def minify_css(css_content):
    """CSSファイルをミニファイ（圧縮）する"""
    # コメントを削除（/* ... */）
    css_content = re.sub(r'/\*.*?\*/', '', css_content, flags=re.DOTALL)
    
    # 余分な空白と改行を削除
    css_content = re.sub(r'\s+', ' ', css_content)
    
    # セレクタ周りの空白を最適化
    css_content = re.sub(r'\s*{\s*', '{', css_content)
    css_content = re.sub(r'\s*}\s*', '}', css_content)
    css_content = re.sub(r'\s*;\s*', ';', css_content)
    css_content = re.sub(r'\s*:\s*', ':', css_content)
    css_content = re.sub(r'\s*,\s*', ',', css_content)
    
    # 先頭と末尾の空白を削除
    css_content = css_content.strip()
    
    return css_content
def minify_js(js_content):
    """JavaScriptファイルをミニファイ（圧縮）する - 文字列を安全に保護する方法"""
    # 単行コメントを削除（//で始まる行）
    js_content = re.sub(r'//.*$', '', js_content, flags=re.MULTILINE)

    # 複数行コメントを削除（/* ... */）
    js_content = re.sub(r'/\*.*?\*/', '', js_content, flags=re.DOTALL)

    # 文字列リテラル（シングル/ダブル/テンプレート）を一時的に退避して保護
    placeholders = []

    def _protect_strings(m):
        s = m.group(0)
        # 文字列内部の改行を削除し、複数スペースやタブを1つにまとめる（値の間のスペースは保持）
        s = s.replace('\n', '')
        s = re.sub(r'[ \t]+', ' ', s)
        placeholders.append(s)
        return f"__STR_PLACEHOLDER_{len(placeholders)-1}__"

    js_no_strings = re.sub(r"('(?:\\.|[^'\\])*'|\"(?:\\.|[^\"\\])*\"|`(?:\\.|[^`\\])*`)", _protect_strings, js_content)
    # 余分な空白を削除（コード本体のみ）
    js_no_strings = re.sub(r'[ \t]+', ' ', js_no_strings)
    js_no_strings = re.sub(r' *\n *', '\n', js_no_strings)
    js_no_strings = re.sub(r'\n+', '\n', js_no_strings)

    # 演算子周りの空白を最適化（コード本体のみ。文字列はプレースホルダのため安全）
    js_no_strings = re.sub(r' *([{}();,=+\-*/<>!&|]) *', r'\1', js_no_strings)

    # 改行を削除
    js_no_strings = js_no_strings.replace('\n', '')

    # 先頭と末尾の空白を削除
    js_no_strings = js_no_strings.strip()

    # 文字列リテラルを復元
    for i, s in enumerate(placeholders):
        js_no_strings = js_no_strings.replace(f"__STR_PLACEHOLDER_{i}__", s)

    return js_no_strings
def minify_file(input_path, output_path, file_type):
    """ファイルをミニファイして保存する"""
    try:
        with open(input_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_size = len(content.encode('utf-8'))
        
        if file_type == 'css':
            minified_content = minify_css(content)
        elif file_type == 'js':
            minified_content = minify_js(content)
        else:
            raise ValueError(f"サポートされていないファイルタイプ: {file_type}")
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(minified_content)
        
        minified_size = len(minified_content.encode('utf-8'))
        reduction = ((original_size - minified_size) / original_size) * 100
        
        print(f"{input_path} -> {output_path}")
        print(f"  元のサイズ: {original_size:,} バイト")
        print(f"  圧縮後: {minified_size:,} バイト")
        print(f"  削減率: {reduction:.1f}%")
        print()
        
    except Exception as e:
        print(f"エラー: {input_path} の処理中にエラーが発生しました: {e}")
# ファイルの設定
files_to_minify = [
    {
        'input': 'style.css',
        'output': 'style.min.css',
        'type': 'css'
    },
    {
        'input': 'script.js',
        'output': 'script.min.js',
        'type': 'js'
    }
]

print("CSS・JavaScriptファイルの最適化を開始します...\n")

for file_config in files_to_minify:
    input_path = file_config['input']
    output_path = file_config['output']
    file_type = file_config['type']
    
    if os.path.exists(input_path):
        minify_file(input_path, output_path, file_type)
    else:
        print(f"警告: {input_path} が見つかりません。スキップします。")

print("最適化が完了しました！")
