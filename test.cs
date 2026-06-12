using System;
using System.Text.RegularExpressions;
using System.IO;

public class DivChecker {
    public static void Run() {
        string path = "c:\\Users\\MobeenShaikh\\Downloads\\DelphiShowroom\\index.html";
        string[] lines = File.ReadAllLines(path);
        int depth = 0;
        for (int i = 0; i < lines.Length; i++) {
            int open = Regex.Matches(lines[i], "(?i)<div\\b[^>]*>").Count;
            int close = Regex.Matches(lines[i], "(?i)</div>").Count;
            depth += (open - close);
            if (depth < 0) {
                Console.WriteLine("Negative depth at line " + (i + 1) + ": " + lines[i].Trim());
                // Don't reset, let's just see where it goes negative.
            }
        }
        Console.WriteLine("Final depth: " + depth);
    }
}
