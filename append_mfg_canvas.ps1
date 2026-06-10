$js = @'

// --- MFG Particle Canvas ---
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("mfg-particle-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width, height;
    let time = 0;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function drawWave(yOffset, color, speed, amplitude, frequency) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) {
            let y = (height / 2) + yOffset + Math.sin(x * frequency + time * speed) * amplitude;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        time += 0.02;

        // Draw multiple glowing orange strands just like AI Symptom Checker
        drawWave(-50, 'rgba(233, 76, 23, 0.1)', 0.5, 100, 0.003);
        drawWave(0, 'rgba(233, 76, 23, 0.2)', 0.7, 150, 0.002);
        drawWave(50, 'rgba(233, 76, 23, 0.3)', 0.9, 80, 0.004);
        drawWave(100, 'rgba(255, 255, 255, 0.05)', 0.4, 200, 0.001);

        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize);
    resize();
    animate();
});
'@

Add-Content -Path "c:\Users\MobeenShaikh\Downloads\DelphiShowroom\js\main.js" -Value $js
