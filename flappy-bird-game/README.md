### **Guideline for Adjusting Jump Mechanics**

1. **Game Frame Rate (FPS):**

   - The game runs at **60 Frames Per Second (FPS)**, meaning the `run` function executes 60 times per second.
   - Each frame updates the game: drawing the background, bird, pipes, and score.

2. **Bird's Movement Per Frame:**

   - The bird moves downward **1 pixel per frame** due to gravity.
   - In **1 second**, the bird falls **60 pixels** (calculated as `FPS * gravity`).

3. **Jump Mechanics:**

   - When the player presses the jump button, the bird jumps upward by a value defined as `birdLift`.
   - To counteract the bird's downward fall, multiple presses are required within 1 second.

4. **Calculate the Jump Effectiveness:**

   - To surpass the bird's fall, the total jump height from presses must be greater than the fall height.
   - Formula:  
     **Height from presses = Number of presses × birdLift**  
     **Height of fall = FPS × gravity**

5. **Determine Minimum Presses:**

   - For the bird to ascend within 1 second:  
     **Number of presses × birdLift > FPS × gravity**

6. **Example:**

   - If `birdLift = 20` and `gravity = 1`:  
     **Height of fall = 60 × 1 = 60 px**  
     **Number of presses required = 60 / 20 = 3 presses**
     - This means pressing 3 times within 1 second will cause the bird to ascend.

7. **Adjusting Difficulty:**
   - Increase `birdLift` for higher jumps per press.
   - Adjust `gravity` to control how quickly the bird falls.

Use this calculation to fine-tune your game's physics and make it more enjoyable! 😊
