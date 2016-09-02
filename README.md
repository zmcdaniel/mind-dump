# Mind Dump

## About

A linguistic analysis service. Breaks your text input down into emotion, social, and language categories to help you gain more insight into your communication and thinking habits. 

In addition to boosting creativity through stream-of-consciousness writing, Mind Dump utilizes IBM's Watson platform to perform a 'tone check' to provide insights about three types of tones in a piece of text including emotion (negative emotions, cheerfulness, anger), social propensities (openness, agreeableness, and conscientiousness), and writing styles (analytical, confident, and tentative). 

The end goal is to provide data-driven insignt into one's inner thoughts to better prioritize, synchronize, and live a more mindful day

## Potential uses

* Personal and business communications: a service to get feedback about communications, which could improve the effectiveness of the messages and how they are received.
* Message resonance: optimize the tones in your communication to increase the impact on your audience.
* Self-branding: Bloggers and journalists could use the Tone Analyzer Service to get feedback in their tone and fine-tune their writing to reflect a specific personality or style.

## Technologies used
* Node
* Express
* EJS
* IBM Watson
* Bootstap
* Font Awesome icons
* SubtlePatterns.com for the background
* Google Fonts
* Chart.js
* Countable.js
* Passport

## Approach

I initially wanted to create a private website where a user could do a daily "mind dump" exercise a la [morning pages](http://lifehacker.com/write-morning-pages-by-hand-every-day-to-boost-produc-1623157620), adding Watson into the mix to analyze the text as a whole. I wanted a private space to save and track these daily writings, almost like a journal. The UI would be clean and minimal to prevent distraction and allow for a mobile/tablet friendly experiment to write and analyze on the go (for example, while commuting on the bus).

As I experiemented more with the Watson API I began to realize that my focus was pretty narrow, and the tone analysis engine could not only be used for your daily journal, but also for things like email communication and branding. 
