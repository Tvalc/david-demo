# Level Design Specification

## Description
Individual level layouts, progression, and mechanics

## Content
---
# LEVEL DESIGN DOCUMENT: Wacky Golf Mysteries

## 1. OVERVIEW

**Wacky Golf Mysteries** combines physics-based mini-golf gameplay with procedurally generated mysteries that players must solve after each hole. Performance on each hole (measured by the "score" mechanic) affects the number of clues provided for the subsequent mystery segment. The primary gameplay loop alternates between golfing and solving mysteries, encouraging both skillful play and deductive reasoning.

This document outlines the level structure, progression, pacing, difficulty curve, environmental storytelling, and player guidance for browser-based implementation on the Snib AI Game Platform.

---

## 2. LEVEL STRUCTURE & PROGRESSION

### 2.1. Level Sequence

- **Course Structure**: The game is divided into **courses** (sets of 9 or 18 holes). Each hole is a unique, wacky environment.
- **Hole-Mystery Loop**: After each hole, the player is presented with a mini-mystery, riddle, or crime to solve before progressing.
- **Progression**: Completing a mystery unlocks the next hole. The overall course is completed after all holes/mysteries are solved.

### 2.2. Example Sequence

1. **Hole 1**: Haunted Windmill Green
   - Golf play (aim, shoot, score)
   - Mystery: "Who took the missing golf ball?"
2. **Hole 2**: Space Station Fairway
   - Golf play (zero-gravity ramps)
   - Mystery: "Which alien sabotaged the tee-off bot?"
3. **Hole 3**: Pirate Cove
   - Golf play (moving ships, swaying bridges)
   - Mystery: "Who ate the captain's sandwich?"

---

## 3. HOLE (GOLF) DESIGN

### 3.1. Layouts

- **Size**: Each hole fits within a 16:9 aspect ratio, auto-scaling for mobile and desktop.
- **Obstacles**: Animated hazards (windmills, portals, bouncing mushrooms), moving platforms, and interactive elements.
- **Interactivity**: Players use drag-and-release (touch/mouse) to "shoot" the ball.
- **Par Values**: Each hole has a set par; par 3-5 based on complexity.

#### Example Hole Layout: Haunted Windmill Green
- Start area: Lower left
- Obstacles: Rotating windmill at center, spooky fog patches, ghostly bumpers
- Cup: Upper right

### 3.2. Performance & Loading

- **Asset Limitations**: Max 10 unique sprites per hole. Reuse assets where possible.
- **Streaming**: Load only the current hole and adjacent assets; use low-res placeholders during transition.
- **Responsive Design**: UI and interactive elements scale for both landscape and portrait orientation.

---

## 4. MYSTERY SEGMENT DESIGN

### 4.1. Structure

- **Theme**: Each mystery is thematically linked to the previous hole's environment.
- **Procedural Generation**: Clues, suspects, and solutions randomized from a pool; logic ensures solvable puzzles.
- **Clue Count**: Number of clues given = 2 + (par - strokes achieved). E.g., finish 2 under par → 4 clues; 1 over par → 1 clue.

### 4.2. Example Mystery

- **Scenario**: "The Haunted Windmill's ghost lost its keys! Who took them?"
- **Suspects**: Caddie Cat, Spectral Squirrel, Parrot Pirate
- **Clues** (randomized): "The thief was seen near the snack shack", "It wasn't the one with feathers", etc.
- **Solution**: Player selects suspect based on clues.

### 4.3. UI & Interaction

- **Clue Reveal**: Each clue is an interactive card or button, revealed one at a time.
- **Input**: Touch or mouse selection for suspects/items.
- **Feedback**: Immediate positive/negative feedback, with short explanation.

---

## 5. DIFFICULTY CURVE & PACING

### 5.1. Golf Holes

- **Early Holes**: Simple layouts, few obstacles, wide fairways, low par.
- **Mid-Late Holes**: Complex layouts, moving hazards, narrow shots, higher par.
- **Environmental Storytelling**: Each hole introduces new visual cues/hints about upcoming mysteries.

### 5.2. Mystery Segments

- **Early Mysteries**: Fewer suspects, clear clues.
- **Later Mysteries**: More suspects, subtle/ambiguous clues, more logic required.
- **Progressive Linkage**: Overarching course mystery (optional), with clues across holes for advanced players.

### 5.3. Pacing

- **Golf Segment**: 1-2 minutes per hole.
- **Mystery Segment**: 1 minute to review clues and make a choice.
- **Transitions**: Short animated transitions (max 2 seconds) between segments.

---

## 6. ENVIRONMENTAL STORYTELLING

- **Visual Hints**: Environmental details (e.g., muddy footprints, suspicious snack wrappers) foreshadow mystery content.
- **Interactive Elements**: Clicking/tapping certain scenery during golf play provides bonus hints or easter eggs.
- **Character Cues**: Suspects sometimes appear as spectators or obstacles on the course.

---

## 7. PLAYER GUIDANCE & UI

### 7.1. Golf UI

- **Aim Indicator**: Arrow showing shot direction and strength (drag length).
- **Par & Score Display**: Clearly visible current hole, par, strokes, and total score.
- **Shoot Button**: Large, touch-friendly area for initiating shots.

### 7.2. Mystery UI

- **Clue Tracker**: Visual display of clues found vs. total possible.
- **Suspect Select**: Large, easily tappable suspect icons.
- **Submit Button**: Prominent, with confirmation prompt on desktop/touch.

### 7.3. Guidance

- **Tutorial (Hole 1)**: Step-by-step overlay for first golf shot and first mystery.
- **Hints Button**: Optional, reveals general guidance (impacts score if used).

---

## 8. OPTIMIZATION FOR WEB

- **Asset Budget**: Max 2MB per hole (sprites, audio, scripts).
- **Lazy Loading**: Preload only next hole/mystery during current play.
- **Touch & Mouse Input**: All interactive elements support both modalities.
- **Scalable UI**: Uses relative units (vw/vh) and media queries for sizing.
- **Reduced Animations**: Minimal, looped, or event-based only.

---

## 9. LEVEL EXAMPLES

### LEVEL 1: Haunted Windmill Green

- **Golf**: Simple L-shaped fairway, one rotating windmill, static bumpers.
- **Mystery**: 2 suspects, 3 procedural clues, clear visual hints (ghost footprints).

### LEVEL 5: Space Station Fairway

- **Golf**: Zero-gravity sections, moving conveyor belts, wormhole portals.
- **Mystery**: 3 suspects, 2-4 clues, ambiguous hints (alien footprints, malfunctioning bots).

### LEVEL 9: Pirate Cove

- **Golf**: Ship masts as obstacles, swinging bridges, anchor traps.
- **Mystery**: 4 suspects, up to 5 clues, multi-step deduction (e.g., who had access to the captain’s quarters).

---

## 10. POTENTIAL INCONSISTENCIES

- **Mechanics**: Ensure "shoot" and "score" mechanics are explicitly referenced and tracked in both golf and mystery segments.
- **Character Usage**: No defined player character—suspects/characters only appear in mysteries and as course visuals.

---

## 11. IMPLEMENTATION CHECKLIST

- [ ] Responsive HTML5 layouts for holes and mysteries
- [ ] Procedural clue and suspect generation system
- [ ] Scalable UI for touch/mouse
- [ ] Asset streaming and loading strategy
- [ ] Golf physics and "shoot" mechanic
- [ ] Score tracking and clue allocation logic
- [ ] Environmental storytelling asset integration
- [ ] Feedback and guidance overlays

---

**This document aligns with the GAME DESIGN DOCUMENT and references required mechanics. Update as new characters, assets, or mechanics are defined.**


---
*Generated on 7/23/2025*
