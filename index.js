<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>İyi Ki Doğdun Rümeysa!</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Poppins', sans-serif; overflow: hidden; background: #1a1a2e; }
        
        .screen {
            position: fixed; inset: 0;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            transition: opacity 0.8s ease;
        }
        .hidden { opacity: 0; pointer-events: none; }
        
        /* Başlangıç Ekranı */
        #start-screen {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            cursor: pointer; z-index: 100;
        }
        #start-screen h1 {
            color: white; font-size: 2.2rem; text-align: center;
            text-shadow: 2px 2px 10px rgba(0,0,0,0.3);
            animation: pulse 2s infinite;
            padding: 0 20px;
        }
        #start-screen .hint {
            color: rgba(255,255,255,0.8); margin-top: 1rem;
            font-size: 1rem;
        }
        @keyframes pulse {
            0%,100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        /* Konfeti Canvas */
        #confetti-canvas {
            position: fixed; inset: 0; pointer-events: none; z-index: 90;
        }
        
        /* Pasta Ekranı */
        #cake-screen {
            background: linear-gradient(180deg, #2d1b4e 0%, #1a1a2e 100%);
            z-index: 50;
        }
        
        .pasta-container {
            position: relative; margin-bottom: 2rem;
        }
        
        .cake {
            width: 220px; height: 140px;
            background: linear-gradient(180deg, #f4d03f 0%, #e67e22 100%);
            border-radius: 20px 20px 60px 60px;
            position: relative;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4), inset 0 -10px 20px rgba(0,0,0,0.1);
        }
        .cake::before {
            content: ''; position: absolute;
            top: -30px; left: 10px; right: 10px; height: 40px;
            background: linear-gradient(180deg, #fadbd8 0%, #f5b7b1 100%);
            border-radius: 10px 10px 0 0;
        }
        .cake::after {
            content: 'RÜMEYSA';
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            color: #8e44ad; font-weight: 800; font-size: 1.4rem;
            letter-spacing: 3px; text-shadow: 1px 1px 2px rgba(255,255,255,0.5);
        }
        
        .candles {
            position: absolute; top: -70px; left: 50%; transform: translateX(-50%);
            display: flex; gap: 20px;
        }
        .candle {
            width: 12px; height: 50px;
            background: linear-gradient(90deg, #ff6b6b, #ee5a24);
            border-radius: 6px; position: relative;
        }
        .candle:nth-child(2) { background: linear-gradient(90deg, #4ecdc4, #44a3aa); }
        .candle:nth-child(3) { background: linear-gradient(90deg, #ffe66d, #f7d794); }
        
        .flame {
            position: absolute; top: -22px; left: 50%; transform: translateX(-50%);
            width: 16px; height: 24px;
            background: radial-gradient(ellipse at bottom, #fff 0%, #ffd700 30%, #ff6b35 70%, transparent 100%);
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            animation: flicker 0.1s infinite alternate;
            box-shadow: 0 0 20px #ff6b35, 0 0 40px #ffd700;
        }
        @keyframes flicker {
            0% { transform: translateX(-50%) scale(1) rotate(-2deg); }
            100% { transform: translateX(-50%) scale(1.1) rotate(2deg); }
        }
        .flame.out {
            animation: extinguish 0.5s forwards;
        }
        @keyframes extinguish {
            0% { opacity: 1; transform: translateX(-50%) scale(1); }
            100% { opacity: 0; transform: translateX(-50%) scale(0) translateY(10px); }
        }
        
        #shake-text {
            color: #ffeaa7; font-size: 1.3rem; font-weight: 600;
            text-align: center; margin-top: 1.5rem;
            text-shadow: 0 0 20px rgba(255,234,167,0.5);
            animation: glow 1.5s infinite alternate;
            padding: 0 20px;
        }
        #shake-text small {
            color: rgba(255,234,167,0.7); font-size: 0.9rem;
        }
        @keyframes glow {
            from { text-shadow: 0 0 10px rgba(255,234,167,0.3); }
            to { text-shadow: 0 0 30px rgba(255,234,167,0.8), 0 0 50px #fdcb6e; }
        }
        
        /* Kapanış Ekranı */
        #end-screen {
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
            z-index: 60;
        }
        #end-screen h1 {
            color: white; font-size: 3rem; text-align: center;
            text-shadow: 2px 2px 20px rgba(0,0,0,0.3);
            padding: 0 20px;
        }
        #end-screen p {
            color: rgba(255,255,255,0.9); font-size: 1.3rem; margin-top: 1rem;
        }
        .balloon {
            position: absolute; width: 60px; height: 70px;
            border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
            animation: float 6s ease-in-out infinite;
            opacity: 0.7;
        }
        .balloon::after {
            content: ''; position: absolute; bottom: -30px; left: 50%;
            width: 1px; height: 30px; background: rgba(255,255,255,0.5);
        }
        @keyframes float {
            0%,100% { transform: translateY(0) rotate(-5deg); }
            50% { transform: translateY(-30px) rotate(5deg); }
        }
        
        /* Alkış animasyonu */
        .clap-hands {
            position: fixed; bottom: 20px; right: 20px;
            font-size: 2rem; opacity: 0.6;
            animation: clap 0.5s infinite alternate;
        }
        @keyframes clap {
            0% { transform: scale(1); }
            100% { transform: scale(1.2); }
        }
        
        @media (max-width: 480px) {
            #start-screen h1 { font-size: 1.5rem; }
            .cake { width: 180px; height: 110px; }
            .cake::after { font-size: 1.1rem; }
            #end-screen h1 { font-size: 2rem; }
            #shake-text { font-size: 1.1rem; }
        }
    </style>
</head>
<body>

    <!-- Başlangıç Ekranı -->
    <div id="start-screen" class="screen">
        <h1>Lütfen Ekrana 1 Kez Tıklayınız</h1>
        <p class="hint">Sürpriz seni bekliyor 🎉</p>
    </div>

    <!-- Konfeti Canvas -->
    <canvas id="confetti-canvas"></canvas>

    <!-- Pasta Ekranı -->
    <div id="cake-screen" class="screen hidden">
        <div class="pasta-container">
            <div class="candles">
                <div class="candle"><div class="flame" id="flame1"></div></div>
                <div class="candle"><div class="flame" id="flame2"></div></div>
                <div class="candle"><div class="flame" id="flame3"></div></div>
            </div>
            <div class="cake"></div>
        </div>
        <div id="shake-text">Mumları Söndürmek İçin Telefonu Salla<br><small>(veya 5 saniye bekle)</small></div>
        
        <!-- Gizli YouTube player -->
        <div style="position:absolute;left:-9999px;">
            <iframe id="yt-player" width="1" height="1" src="" frameborder="0" allow="autoplay"></iframe>
        </div>
        
        <!-- Alkış emojisi -->
        <div class="clap-hands" id="clap-emoji">👏</div>
    </div>

    <!-- Kapanış Ekranı -->
    <div id="end-screen" class="screen hidden">
        <div class="balloon" style="background:#e74c3c; top:10%; left:10%; animation-delay:0s;"></div>
        <div class="balloon" style="background:#3498db; top:15%; right:15%; animation-delay:1s;"></div>
        <div class="balloon" style="background:#f39c12; top:20%; left:70%; animation-delay:2s;"></div>
        <div class="balloon" style="background:#9b59b6; bottom:20%; left:20%; animation-delay:0.5s;"></div>
        <div class="balloon" style="background:#1abc9c; bottom:15%; right:10%; animation-delay:1.5s;"></div>
        <h1>İyi Ki Doğdun Rümeysa! 🎂</h1>
        <p>Mutlu yıllar! 🎈🎁✨</p>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
    <script>
        const startScreen = document.getElementById('start-screen');
        const cakeScreen = document.getElementById('cake-screen');
        const endScreen = document.getElementById('end-screen');
        const shakeText = document.getElementById('shake-text');
        const ytPlayer = document.getElementById('yt-player');
        const clapEmoji = document.getElementById('clap-emoji');
        
        let candlesOut = false;
        
        // Konfeti fonksiyonu
        function fireConfetti() {
            const duration = 5000;
            const end = Date.now() + duration;
            const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a29bfe', '#fd79a8', '#fab1a0'];
            
            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });
                
                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
        
        // Mumları söndür
        function extinguishCandles() {
            if (candlesOut) return;
            candlesOut = true;
            
            document.querySelectorAll('.flame').forEach((flame, i) => {
                setTimeout(() => flame.classList.add('out'), i * 200);
            });
            
            shakeText.style.transition = 'opacity 1s';
            shakeText.style.opacity = '0';
            clapEmoji.style.display = 'none';
            
            setTimeout(() => {
                cakeScreen.classList.add('hidden');
                endScreen.classList.remove('hidden');
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: ['#00b894', '#00cec9', '#55efc4', '#81ecec']
                });
            }, 2000);
        }
        
        // Tıklama olayı
        startScreen.addEventListener('click', () => {
            startScreen.classList.add('hidden');
            fireConfetti();
            
            setTimeout(() => {
                cakeScreen.classList.remove('hidden');
                ytPlayer.src = 'https://www.youtube.com/embed/3W0lbx88K5M?autoplay=1&start=5';
                
                // 5 saniye bekleme ile otomatik sönme
                setTimeout(extinguishCandles, 5000);
                
            }, 5000);
        });
        
        // Telefon sallama algılama
        if (window.DeviceMotionEvent) {
            let lastX = 0, lastY = 0, lastZ = 0;
            let shakeThreshold = 15;
            
            window.addEventListener('devicemotion', (e) => {
                const acc = e.accelerationIncludingGravity;
                if (!acc) return;
                
                const deltaX = Math.abs(acc.x - lastX);
                const deltaY = Math.abs(acc.y - lastY);
                const deltaZ = Math.abs(acc.z - lastZ);
                
                if ((deltaX > shakeThreshold || deltaY > shakeThreshold || deltaZ > shakeThreshold) && !candlesOut) {
                    extinguishCandles();
                }
                
                lastX = acc.x; lastY = acc.y; lastZ = acc.z;
            });
        }
        
        // Yedek: Ekrana tıklayarak da söndürme (test için)
        cakeScreen.addEventListener('click', () => {
            if (!candlesOut && !cakeScreen.classList.contains('hidden')) {
                extinguishCandles();
            }
        });
    </script>
</body>
</html>
