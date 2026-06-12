import re
with open('c:/Users/MobeenShaikh/Downloads/DelphiShowroom/admin/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

def check_id(id_val):
    idx = html.find('id="' + id_val + '"')
    if idx == -1:
        print(f"ID {id_val} not found")
        return
    prefix = html[:idx]
    tags = []
    for m in re.finditer(r'</?(?:section|div)(?:\s[^>]*)?>', prefix, re.IGNORECASE):
        tag = m.group(0).lower()
        if tag.startswith('</'):
            if tags:
                tags.pop()
        else:
            tags.append(tag)
    print(f"Parents of {id_val}:")
    for t in tags:
        print("  " + t)

check_id('screen-datamodels')
check_id('screen-engines')
check_id('screen-manufacturing')
