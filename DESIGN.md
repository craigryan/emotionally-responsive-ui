# Emotionally Responsive Web Design

A UI, such as a web designed browser page, is a mostly static interface which essentially accepts user input and serves content. It's role is highly instructional and subservient. The same page styles and layout are offered for all users regardless of their abilities, emotional state or needs.

Emotional recognition (how a person is perceived to be feeling) may be accurately assessed through a hybrid approach which combines facial, voice and gesture analysis. Affect recognition tries to read the immediate expression of emotion in response to some experience.

This app illustrates an attempt to combine affect recognition with web design to produce a page which is emotionally responsive. The UI will recognise emotional signals and adjust both appearance and content in order to deliver a User Experience considered as positive and comfortable for the current user.

The solution uses pre-trained models / AI to help determine the overal emotional ratings.

## From Interface to Interaction

By definition, "an Interaction is a kind of action that occurs as two or more objects have an effect upon one another". This implies that, rather than provide basic data input validation, a user interface's appearance and behaviour should adapt to the user's emotional responses.

## Techniques

The system provides basic views to view Emotional recognition data and their effect on the generic app processing a fictional Application submission.

### Facial expression

A user sitting in front a laptop is less likely to 'put on a happy face', instead expressing a raw emotional response to the page's instruction. We group these into the follow five key categories

1. **Delighted** (Very happy): The user feels joy or excitement.
2. **Engaged** (Focused, neutral-positive): The user is attentive and immersed.
3. **Neutral**: The user is indifferent or at least not visibly affected.
4. **Frustrated**: The user shows irritation or mild dissatisfaction.
5. **Confused** (Very unhappy): The user is overwhelmed, puzzled, or struggling.

We can also detect age, likely gender (only male or female) and other data to associate the user with a likely demographic group.

### Voice

While interacting with a page, the users voice helps to clarify how much they rate the experience.

-   positive / negative sentiment detections
-   calm or silent content vs expresions of anger
-   questions / doubt, confusion, impatience

These may influence the content of the page but also the colour scheme and possible tips to allow manualy adjustments such as "is this page theme more appropriate?"

### Keyboard input

The rate and tempo of user input can identify a user who is experienced with the device versus one who struggles to comply. We might measure

-   the speed of each key press and release and characters per second
-   repeated key press of the same key (bashing the Return key, excessive backspace/corrections)
-   excessive, erratic and repetitive mouse movements

### Combined

By combining the typing patterns, facial expression and voice the web design can respond in an emotionally appropriate fashion, much like a friend would react to user describing a personal experience.

Factors the design may alter could include:

-   Colours and themes that suit a particular emotional response (warm, cold, sharp etc)
-   Reduced or increased screen content based on 'experienced' vs 'novice' detection
-   Alter content such as labels and promtps to be more terse / detailed
-   Help and suggestion prompts
-   Colour highlighting for completed/incomplete data
-   Re-ordering content based on selections
-   Audio prompts to calm
-   Accept audio (input) cues
-   Combine multi-steps into one (reduce pages for experienced)
-   Offer alternative flows (confused -> 'Would you like us to call you and help complete this application?')
