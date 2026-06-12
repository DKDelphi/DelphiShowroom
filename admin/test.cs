using System;
using System.Text.RegularExpressions;

string html = System.IO.File.ReadAllText("c:\\Users\\MobeenShaikh\\Downloads\\DelphiShowroom\\admin\\index.html");
int idx = html.IndexOf("id=\"screen-datamodels\"");
string prefix = html.Substring(0, idx);

int divOpen = Regex.Matches(prefix, "(?i)<div\\b[^>]*>").Count;
int divClose = Regex.Matches(prefix, "(?i)</div>").Count;
int sectionOpen = Regex.Matches(prefix, "(?i)<section\\b[^>]*>").Count;
int sectionClose = Regex.Matches(prefix, "(?i)</section>").Count;

Console.WriteLine($"Div depth: {divOpen - divClose}");
Console.WriteLine($"Section depth: {sectionOpen - sectionClose}");
