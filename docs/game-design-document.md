# Game Design Document

## Description
Overall game vision, mechanics, and core design decisions

## Content
---
# GAME DESIGN DOCUMENT: Wacky Golf Mysteries

## 1. GAME VISION

**Wacky Golf Mysteries** is a browser-based golf game with a twist: after each hole, players must solve a procedurally generated mystery, riddle, or crime. Performance on each golf hole (relative to par) determines how many clues the player receives to solve the following mystery. The game merges casual, whimsical mini-golf with light, replayable detective gameplay, all optimized for instant, responsive play across desktop and mobile browsers.

---

## 2. CORE GAMEPLAY LOOP

1. **Play a Wacky Golf Hole**
    - Use intuitive controls (touch/mouse) to line up and shoot the ball.
    - Each hole features unique, comedic obstacles and environments.
2. **Score Calculation**
    - The player’s performance is measured against par.
    - Fewer strokes under par = more clues for the next mystery.
3. **Solve a Mystery/Riddle/Crime**
    - Using the clues awarded, the player tries to solve a procedurally generated puzzle.
    - Submit a solution (multiple choice, short answer, or clue selection).
4. **Progression**
    - Success unlocks the next hole & mystery.
    - Mistakes may lead to “funny fail” animations or small penalties, but the game remains light-hearted.
5. **Loop**
    - Continue through a sequence of holes and mysteries, with escalating challenge and variety.

---

## 3. TARGET AUDIENCE

- **Casual Gamers:** Seeking short, engaging browser experiences.
- **Puzzle & Riddle Fans:** Enjoy light detective or logic gameplay.
- **All Ages:** Family-friendly humor, accessible controls, minimal reading required.
- **Mobile & Desktop Players:** Optimized for instant play and responsive design.

---

## 4. KEY DIFFERENTIATORS

- **Golf + Mystery Hybrid:** Unique blend of skill-based sports and procedural puzzles.
- **Performance-Driven Clue System:** Direct correlation between golf skill and deduction advantage.
- **Procedural Content:** High replayability via randomized holes, obstacles, and mysteries.
- **Instant Browser Play:** No downloads, quick sessions, seamless across devices.

---

## 5. GAMEPLAY SYSTEMS

### 5.1 GOLF MECHANICS

- **Core Controls:**
    - Drag (touch/mouse) to aim and set power, release to shoot.
    - Tap/Click to interact with certain obstacles (e.g., moving platforms, switches).
- **Physics:**
    - 2D top-down or isometric physics for ball movement and collisions.
- **Wacky Obstacles:**
    - Moving windmills, teleporters, bouncing pads, silly hazards (banana peels, portals, talking statues).
- **Hole Variety:**
    - Each hole features a distinctive visual theme and mechanical gimmicks.
- **Par System:**
    - Par 3–5 per hole; performance tracked per attempt.

### 5.2 MYSTERY/RIDDLE SYSTEM

- **Procedural Generation:**
    - Mysteries are built from a pool of templates, suspects, clues, and outcomes.
    - Types: “Who stole the donut?”, “Who broke the statue?”, “Which path leads home?”, “What’s the password?”
- **Clue Allocation:**
    - Under par: 3+ clues.
    - Par: 2 clues.
    - Over par: 1 clue.
    - (Optional bonus clue for hole-in-one or creative play.)
- **Clue Presentation:**
    - Visuals, dialogue snippets, item descriptions, or simple mini-puzzles.
- **Mystery Interface:**
    - Modal or overlay with all clues presented; UI for solution selection (buttons, drag-and-drop).
- **Solution Validation:**
    - Correct solution = progression/reward.
    - Incorrect solution = light penalty (e.g., humorous animation, “try again” option).

### 5.3 PROGRESSION & REWARDS

- **Level Sequence:**
    - 9–18 holes per “course”; each followed by a mystery.
- **Unlocks:**
    - Cosmetic golf balls, new club sounds, wacky avatars (optional, for engagement).
- **Leaderboards:**
    - Optional: Track best scores, fastest solves, most hole-in-ones.
- **Replayability:**
    - Procedural holes/mysteries for variety.
    - Encourage replays for better scores/clues.

---

## 6. PLAYER EXPERIENCE

- **Tone:** Whimsical, light, humorous. Failures are funny, not punishing.
- **Pacing:** Quick holes (1–3 mins), fast mysteries (1–2 mins), total session ~15–20 mins for a course.
- **Accessibility:** Large UI elements, colorblind-friendly clues, minimal text for younger players.
- **Instant Engagement:** Loads in seconds, no account required.

---

## 7. RESPONSIVE & TECHNICAL CONSIDERATIONS

- **Input:** Mouse drag/release (desktop), touch drag/release (mobile).
- **Display:** Responsive layout; adapt to aspect ratios and screen sizes.
- **Performance:** Lightweight 2D physics; limit particle effects, asset sizes.
- **Persistence:** Store progress in browser localStorage; optional cloud save if platform supports.
- **Audio:** Simple, toggleable sound effects and background music.

---

## 8. SUCCESS METRICS

- **Session Duration:** Avg. time per session/hole/mystery.
- **Retention:** % of players returning after first session.
- **Completion Rate:** % finishing a course (all holes + mysteries).
- **Replay Rate:** % of players replaying holes for better score/clues.
- **Engagement:** Number of mysteries solved, clues earned per play.

---

## 9. SAMPLE HOLE & MYSTERY FLOW

1. **Golf Hole:**
    - “The Spinning Llama Loop” — avoid spinning llamas, shoot into a portal.
    - Player finishes 2 under par (3 clues earned).
2. **Mystery:**
    - “Who spilled the glitter in the clubhouse?”
    - Clues: “Glitter on the chef’s hat”, “Janitor was sweeping outside”, “Golf pro’s shoes are sparkling.”
    - Player selects the chef as culprit — correct!
3. **Progress:** Next hole unlocked, funny animation plays.

---

## 10. FUTURE EXPANSION IDEAS

- **Multiplayer Races:** Compete to solve mysteries fastest after each hole.
- **Custom Hole Editor:** Players create/share their own wacky golf holes and mysteries.
- **Seasonal Themes:** Holiday courses, themed mysteries.

---

## 11. IMPLEMENTATION PRIORITIES

1. **Core Golf Gameplay:** Physics, controls, 3–5 unique holes.
2. **Procedural Mystery Generator:** Clue allocation, templates, solution UI.
3. **Clue Integration:** Link golf performance to clues.
4. **Responsive UI/UX:** Seamless on mobile and desktop.
5. **Polish:** Humor, sound, animations.
6. **Replay/Progression System:** Unlocks, basic leaderboards.

---

### POTENTIAL CONFLICTS / INCONSISTENCIES

- *None identified; no prior character or system definitions exist. This is a foundational document.*

---

**Prepared for Snib AI Game Platform — Version 1.0**


---
*Generated on 7/23/2025*
