const GAME_WIDTH = 480;
const GAME_HEIGHT = 640;

const PLAYER_START_LIVES = 10; // Changed from 3 to 10

const PLAYER_BULLET_SPRITES = [
    "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/space-shooter-bullets/plasma1_transparent.png",
    "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/space-shooter-bullets/plasma2_transparent.png",
    "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/space-shooter-bullets/plasma3_transparent.png",
    "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/space-shooter-bullets/plasma4_transparent.png"
];

const _playerBulletImages = [];
let _playerBulletImagesLoaded = false;
(function preloadPlayerBulletSprites() {
    let loaded = 0;
    for (let i = 0; i < PLAYER_BULLET_SPRITES.length; ++i) {
        const img = new Image();
        img.src = PLAYER_BULLET_SPRITES[i];
        img.onload = () => {
            loaded++;
            if (loaded === PLAYER_BULLET_SPRITES.length) {
                _playerBulletImagesLoaded = true;
            }
        };
        _playerBulletImages.push(img);
    }
})();

function initGame() {

    const container = document.getElementById('gameContainer');

    const canvas = document.createElement('canvas');
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    canvas.tabIndex = 1;
    canvas.style.outline = 'none';

    canvas.style.background = 'transparent';
    container.appendChild(canvas);

    const startMenu = document.createElement('div');
    startMenu.id = 'startMenu';
    startMenu.innerHTML = `
        <h1>Space Shooter</h1>
        <p>Arrow keys or A/D/Left/Right to move<br>
        Space to shoot</p>
        <button id="startBtn">Start Game</button>
    `;
    container.appendChild(startMenu);

    const gameOverScreen = document.createElement('div');
    gameOverScreen.id = 'gameOverScreen';
    gameOverScreen.innerHTML = `
        <h2>Game Over</h2>
        <div class="score"></div>
        <button id="restartBtn">Restart</button>
    `;
    container.appendChild(gameOverScreen);

    document.getElementById('startBtn').onclick = () => {
        startMenu.style.display = 'none';
        canvas.focus();
        new SpaceShooterGame(canvas, startMenu, gameOverScreen);
    };

    window.addEventListener('keydown', function handleEnter(e) {
        if (startMenu.style.display !== 'none' && (e.key === 'Enter' || e.key === ' ')) {
            startMenu.style.display = 'none';
            canvas.focus();
            new SpaceShooterGame(canvas, startMenu, gameOverScreen);
            window.removeEventListener('keydown', handleEnter);
        }
    });

    startMenu.style.display = 'block';
}

window.addEventListener('DOMContentLoaded', initGame);


class SpaceShooterGame {
    constructor(canvas, startMenu, gameOverScreen) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.startMenu = startMenu;
        this.gameOverScreen = gameOverScreen;

        this.score = 0;
        this.lives = PLAYER_START_LIVES; // Use constant for starting lives
        this.gameOver = false;

        this.player = new Player(this.width / 2, this.height - 60);
        this.bullets = [];
        this.enemies = [];
        this.enemyBullets = [];
        this.lastEnemySpawn = 0;
        this.enemySpawnInterval = 1200; // ms

        this.keys = {};
        this.lastShot = 0;
        this.shootDelay = 280; // ms

        this._bindInput();

        this.lastFrameTime = performance.now();

        this.render();
    }

    _bindInput() {
        this.keydownHandler = e => {
            if (['ArrowLeft', 'a', 'A', 'ArrowRight', 'd', 'D', ' '].includes(e.key)) {
                e.preventDefault();
            }
            this.keys[e.key] = true;
        };
        this.keyupHandler = e => {
            this.keys[e.key] = false;
        };
        this.canvas.addEventListener('keydown', this.keydownHandler);
        this.canvas.addEventListener('keyup', this.keyupHandler);
    }

    _unbindInput() {
        this.canvas.removeEventListener('keydown', this.keydownHandler);
        this.canvas.removeEventListener('keyup', this.keyupHandler);
    }

    render(now = performance.now()) {
        if (this.gameOver) return;

        const dt = Math.min(now - this.lastFrameTime, 60) / 1000;
        this.lastFrameTime = now;

        this._update(dt, now);
        this._draw();

        requestAnimationFrame(this.render.bind(this));
    }

    _update(dt, now) {

        let move = 0;
        if (this.keys['ArrowLeft'] || this.keys['a'] || this.keys['A']) move -= 1;
        if (this.keys['ArrowRight'] || this.keys['d'] || this.keys['D']) move += 1;
        this.player.move(move, this.width);

        if ((this.keys[' '] || this.keys['Spacebar']) && now - this.lastShot > this.shootDelay) {
            this.bullets.push(new Bullet(this.player.x, this.player.y - 28, -11, 'player'));
            this.lastShot = now;
        }

        this.bullets.forEach(b => b.update());
        this.bullets = this.bullets.filter(b => b.y > -20 && b.y < this.height + 20);

        if (now - this.lastEnemySpawn > this.enemySpawnInterval) {
            let ex = 32 + Math.random() * (this.width - 64);
            this.enemies.push(new Enemy(ex, -32));
            this.lastEnemySpawn = now;

            this.enemySpawnInterval = Math.max(480, this.enemySpawnInterval * 0.993);
        }

        this.enemies.forEach(e => {
            e.update();

            if (Math.random() < 0.011 && e.y > 0) {
                this.enemyBullets.push(
                    new Bullet(e.x, e.y + 22, 6, 'enemy')
                );
            }
        });
        this.enemies = this.enemies.filter(e => !e.isDead && e.y < this.height + 40);

        this.enemyBullets.forEach(b => b.update());
        this.enemyBullets = this.enemyBullets.filter(b => b.y > -20 && b.y < this.height + 40);

        for (let bullet of this.bullets) {
            if (bullet.owner === 'player') {
                for (let enemy of this.enemies) {
                    if (!enemy.isDead && _circleCollide(bullet.x, bullet.y, 18, enemy.x, enemy.y, 22)) {
                        enemy.isDead = true;
                        bullet.y = -1000; // Remove bullet
                        this.score += 100;
                        break;
                    }
                }
            }
        }

        for (let eBullet of this.enemyBullets) {
            if (_circleCollide(eBullet.x, eBullet.y, 6, this.player.x, this.player.y, 18)) {
                eBullet.y = -1000;
                this._playerHit();
            }
        }

        for (let enemy of this.enemies) {
            if (!enemy.isDead && _circleCollide(enemy.x, enemy.y, 22, this.player.x, this.player.y, 20)) {
                enemy.isDead = true;
                this._playerHit();
            }
        }
    }

    _playerHit() {
        if (this.player.hitCooldown > 0) return;
        this.lives -= 1;
        this.player.hitCooldown = 60; // frames
        if (this.lives <= 0) {
            this._endGame();
        }
    }

    _draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);

        _drawStars(ctx, this.width, this.height);

        this.player.draw(ctx);

        this.bullets.forEach(b => b.draw(ctx));

        this.enemies.forEach(e => e.draw(ctx));

        this.enemyBullets.forEach(b => b.draw(ctx, true));

        ctx.save();
        ctx.font = '20px Segoe UI, Arial';
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#0ff';
        ctx.shadowBlur = 8;
        ctx.fillText('Score: ' + this.score, 20, 36);
        ctx.fillText('Lives: ' + this.lives, this.width - 110, 36);
        ctx.restore();
    }

    _endGame() {
        this.gameOver = true;
        this._unbindInput();
        setTimeout(() => {
            this._showGameOver();
        }, 500);
    }

    _showGameOver() {
        const screen = this.gameOverScreen;
        screen.querySelector('.score').textContent = 'Final Score: ' + this.score;
        screen.style.display = 'block';
        document.getElementById('restartBtn').onclick = () => {
            screen.style.display = 'none';
            this._restart();
        };
    }

    _restart() {

        this.score = 0;
        this.lives = PLAYER_START_LIVES; // Use constant for starting lives
        this.gameOver = false;
        this.player = new Player(this.width / 2, this.height - 60);
        this.bullets = [];
        this.enemies = [];
        this.enemyBullets = [];
        this.lastEnemySpawn = 0;
        this.enemySpawnInterval = 1200;
        this.lastShot = 0;
        this.lastFrameTime = performance.now();
        this._bindInput();
        this.render();
    }
}

function _drawStars(ctx, width, height) {

    ctx.save();
    for (let i = 0; i < 60; ++i) {
        let x = ((i * 347) % width) + Math.sin(Date.now() * 0.0002 + i) * 4;
        let y = ((i * 123) % height) + ((Date.now() * 0.08 + i * 30) % height);
        ctx.globalAlpha = 0.25 + ((i % 7) / 12);
        ctx.beginPath();
        ctx.arc(x, y % height, 1.2 + (i % 3), 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? '#4ad5ff' : (i % 3 === 1 ? '#fff' : '#92eefd');
        ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
}

function _circleCollide(x1, y1, r1, x2, y2, r2) {
    let dx = x1 - x2, dy = y1 - y2;
    return dx * dx + dy * dy < (r1 + r2) * (r1 + r2);
}


class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 18;
        this.speed = 7.2;
        this.hitCooldown = 0;
    }

    move(dir, maxWidth) {
        this.x += dir * this.speed;
        if (this.x < 32) this.x = 32;
        if (this.x > maxWidth - 32) this.x = maxWidth - 32;
        if (this.hitCooldown > 0) this.hitCooldown--;
    }

    draw(ctx) {
        ctx.save();

        ctx.beginPath();
        ctx.arc(this.x, this.y + 18, 22, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(44,252,255,0.15)';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(this.x, this.y - 22);
        ctx.lineTo(this.x - 16, this.y + 20);
        ctx.lineTo(this.x, this.y + 8);
        ctx.lineTo(this.x + 16, this.y + 20);
        ctx.closePath();
        ctx.fillStyle = this.hitCooldown > 0 ? '#e95c7a' : '#39eaff';
        ctx.shadowColor = '#39eaff';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(this.x, this.y - 5, 7, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.globalAlpha = 0.7;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.restore();
    }
}

class Bullet {
    constructor(x, y, vy, owner) {
        this.x = x;
        this.y = y;
        this.vy = vy;
        this.owner = owner; // 'player' or 'enemy'

        this.radius = owner === 'player' ? 18 : 6; // 3x original (from 6 to 18) for player, normal for enemy

        if (owner === 'player') {
            this.animFrame = 0;
            this.animTimer = 0;
            this.animFrameCount = _playerBulletImages.length;
            this.animSpeed = 60 / 1000 * 48; // ~48ms per frame (20+ FPS for smoothness)
        }
    }

    update() {
        this.y += this.vy;
        if (this.owner === 'player') {
            if (_playerBulletImagesLoaded) {
                this.animTimer += Math.abs(this.vy);
                if (this.animTimer > this.animSpeed) {
                    this.animFrame = (this.animFrame + 1) % this.animFrameCount;
                    this.animTimer = 0;
                }
            }
        }
    }

    draw(ctx, isEnemy = false) {
        if (this.owner === 'player') {
            if (_playerBulletImagesLoaded && _playerBulletImages[this.animFrame]) {
                ctx.save();

                const img = _playerBulletImages[this.animFrame];

                const w = img.width;
                const h = img.height;

                if (w && h) {
                    ctx.globalAlpha = 0.92;

                    const scale = 0.6; // Was 0.2, now 0.6 (3x bigger)
                    ctx.drawImage(
                        img,
                        this.x - (w * scale) / 2,
                        this.y - (h * scale) / 2,
                        w * scale,
                        h * scale
                    );
                    ctx.globalAlpha = 1;
                } else {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    ctx.fillStyle = '#4ad5ff';
                    ctx.shadowColor = '#4ad5ff';
                    ctx.shadowBlur = 12;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
                ctx.restore();
            } else {
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#4ad5ff';
                ctx.shadowColor = '#4ad5ff';
                ctx.shadowBlur = 12;
                ctx.globalAlpha = 0.92;
                ctx.fill();
                ctx.globalAlpha = 1;
                ctx.shadowBlur = 0;
                ctx.restore();
            }
        } else {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#ff5b99';
            ctx.shadowColor = '#ff5b99';
            ctx.shadowBlur = 12;
            ctx.globalAlpha = 0.92;
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
            ctx.restore();
        }
    }
}

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 22;
        this.isDead = false;
        this.speed = 2.2 + Math.random() * 1.5;
        this.wobble = Math.random() * Math.PI * 2;
    }

    update() {
        this.y += this.speed;
        this.x += Math.sin(Date.now() * 0.0012 + this.wobble) * 1.35;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, 21, 0, Math.PI * 2);
        ctx.fillStyle = this.isDead ? '#2a2330' : '#e95c7a';
        ctx.shadowColor = '#e95c7a';
        ctx.shadowBlur = this.isDead ? 0 : 16;
        ctx.globalAlpha = this.isDead ? 0.35 : 1;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        if (!this.isDead) {
            ctx.beginPath();
            ctx.arc(this.x - 7, this.y - 5, 2.5, 0, Math.PI * 2);
            ctx.arc(this.x + 7, this.y - 5, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.globalAlpha = 0.7;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
        ctx.restore();
    }
}