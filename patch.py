import re
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()
with open('index_backup.html', 'r', encoding='utf-8') as f:
    backup = f.read()

start_marker = '<h1>Healthcare'
end_marker = '<!-- TAB 2: Data Models -->'

backup_block = backup[backup.find(start_marker):backup.find(end_marker)]

new_block = re.sub(r'<select id=\"filter-(tech|domain|project)\"[\s\S]*?</select>\n*', '', backup_block)

content = content[:content.find('<h1>Healthcare Solutions</h1>')] + new_block + content[content.find(end_marker):]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Patched successfully!')
