# The Fog
## By [Chelsea Thompto](https://chelsea.technology/)
A digital projects commission for the [San José Museum of Art](https://sjmusart.org/). <br/>
The project can be viewed here: [https://sjmusart.org/digital-projects/chelsea-thompto](https://sjmusart.org/digital-projects/chelsea-thompto)

## Overview
This work is comprised of 3 "acts" exploring our relationship to fog as a society and the potential for fog to serve as a positive role model for trans embodiment. Each act is built as a procedurally generated 3D space using [three.js](https://threejs.org/). The work has been designed as an website without ads or tracking and with intentionally open source code. Sustainability and accessibility also informed the design choices for the site.

## Conceptual
> "I want to live in a world I want to live in."
- [Jennifer Espinoza](https://joshuajenniferespinoza.com/)

> "Like that creature, I assert my worth as a monster in spite of the conditions my monstrosity requires me to face, and redefine a life worth living."
- [Susan Stryker](https://www.susanstryker.net/)

This body of work centers around the politics of knowledge making, data collection, and trans visibility through an exploration of fog as a common subject/trope of horror narratives as well as metaphor used in military strategy. The questions driving this work include: 

> Why has fog been figured as a menace in the popular imagination? Can fog be an aspirational figure for trans embodiment and resistance? What would embodiment styled after fog feel and look like?

Drawing on work by Susan Stryker ([My Words To Victor Frankenstein…](https://sites.evergreen.edu/politicalshakespeares/wp-content/uploads/sites/226/2015/12/Stryker-My-Words-to-VF.pdf)) around the idea of trans identity and the monstrous, the work questions how subjects are perceived as monstrous and what the process says about the societies that produce them. Instead of investing in assimilation as a goal, this work seeks to imagine new trans futures constructed outside of cis-centric models of being. 

The work makes extensive use of ASCII art stylization. This style is used to break away from an emphasis on graphic fidelity as an indicator of quality.value, to further accentuate the computational nature of the scenes, and because of the way ASCII art changes subtly across browsers and resists standardize documentation via screenshot.

This project has been separated into 3 acts. I am calling them "acts" because each composition has been structured as a stage of sorts, each with its own mode of interaction and set of relational elements. Some elements in each act are procedurally generated, meaning that their shape, position, content, or other features are generated via code every time the page is loaded. This allows the work to have an element of controlled randomness which I find useful for creating these stages meant for contemplation over narrative. Each act focuses on a different aspect of the fog research:

### Act 1
From foghorns to the “fog of war” to military efforts to disperse fog, the phenomenon has long been at odds with militaristic and capitalistic ideas of progress and control. In obscuring coasts, roads, and runways, fog denies us the situational awareness upon which so much of contemporary life is built. In its denial of ocular slight, fog highlights the value we place on seeing as knowing and opens up space to consider who gets to see and to what ends do they use that sight? 

This scene is viewed using an orbiting camera similar to those found in 3D modeling and map softwares. The audio in this scene mimics (in a digital and distorted fashion) the sound of fog horns on the coast. The texts for this scene are drawn from scientific papers about fog dispersal, military texts about the fog or war, and economic texts about fog's negative impact. Taken together, these elements are meant to render fog as a subject to be scrutinized. 

### Act 2
As both trope and figure itself, fog has featured prominently across horror narratives as landscape, harbinger, coconspirator, and monster. Whether drifting through tombstones in a graveyard, engulfing a fearful protagonist, or spawning inexplicable horrors, our fear of the unknown is often made manifest by fog. This too exposes the value we place on seeing as knowing and offers us the opportunity to relish in the unknown and unseeable. 

This scene is viewed using controls similar to those found in contemporary 3D video games. The ground and sky are churning masses of fog with the dark mass in the sky vacillating between figure and ground as the camera moves through the space. Texts drawn from horror narratives featuring fog arise out of the ground in random places and are uttered in a low and slurring voice as the texts rise into the fog. The space is also populated by rectilinear building like forms which, unlike the fog masses and texts, are impacted by another layer of computational fog. The resulting effect is that of an abandoned yet alive space.

### Act 3
As something both visible and obscuring, considering fog as a positive model of being in the world opens up new pathways for being in the world as a trans person. Might I, as a trans person, be seen for who I am yet still with the right and power of obscurity? As fog resists the logic of seeing as knowing, might being like fog open up a space for feeling as knowing or being as knowing? To be in the world as fog is: ephemeral yet seen, visible yet difficult to capture, known yet expanding the possibilities of the unknown.

This scene is the only one in which the viewer can actively alter the objects in the space. Featuring cycling texts written by me, which must be exposed by moving fog sections, this final act offers provocations for imagining new and radically different ways of being trans in the world. 

### Political/Ethical Considerations
This work is also intentionally open source and openly accessible in stark contrast to the artificial scarcity and closed nature of NFTs. While the conceptual framework of this project is not chiefly related to ecological concerns, the ecological impact of receding fog due to climate change is an under current of this work and as such, this site has been designed with sustainable web practices in mind (more on that in the technical section).

## Technical
As mentioned above, the background effects and scenes on this site are built with [three.js](https://threejs.org/), the procedurally generated plain-text portions of the work were written in vanilla JavaScript. The movement used for the fog objects were created using 3D noise GLSL adapted from [Stefan Gustavson](https://github.com/ashima/webgl-noise). The acts themselves were written specifically for this commission and portions were built off a combination of prior examples I wrote for my classes and examples from the three.js repository.

Outside of the conceptual framework for this piece, there were two other main considerations for the technical design of this piece: accessibility and sustainability. These are outlined below.

### Accessibility
One of the things that drew me to making browser-based work in the first place was the idea that it would lower the barrier for entry to people compared to a traditional gallery installation. That being said, I also realize that websites are not inherently accessible to all people so I wanted to consider how best to make an experience like the one I created here accessible to more people. Outside of the standard considerations such as alt tags and color contrast, there where two main hurdles: the 3D scenes themselves and the extensive use of ASCII symbols to imply fog: 

- For the 3D scenes. I decided to create separate descriptive text pages that are linked to each act in order to give folks unable to engage with the 3D space and/or its controls. These pages describe the aspects of the work and also link to a video walkthrough of the space. The video walkthroughs can be viewed here: [https://vimeo.com/showcase/10734019](https://vimeo.com/showcase/10734019)

- For the symbols being used to mimic fog with readable text interspersed, I decided to use [aria roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles) and [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) to generate screen reader labels for the ASCII fog text clouds that append the legible text only, allowing screen readers to access the legible the text.

### Sustainability
In 2021, I started a redesign of my portfolio website using more sustainable design practices and then [wrote about why I thought it was important](https://chelsea.technology/writing/blog/posts/8_26_22.html). Since then, I have continued to try and consider sustainability throughout my practice. One of the most direct ways I have found to do that within the context of the web is to reduce the amount of bandwidth a site takes up. To that end, in this project I have landed on the goal of keeping the entirety of this project under 5MB in size. This includes fonts, media assets, and all JS dependencies. **(PROJECT IS CURRENTLY ~2.5MB)**

In addition to this, I have also been deliberate in making sure that all dependencies and assets for the project are present within the repository, meaning that the piece could also be downloaded and run locally on an individual machine or other non-internet network contexts.

These steps by no means "solve" the issue but I think they are important steps in considering how to work elegantly within limits instead of chasing the highest fidelity/resolution/tech possible. I think more artists need to adopt different approaches to their relationship with technology, like those found in the [Damaged Earth Catalog](https://damaged.bleu255.com/).
