---
name: create-image-prompt
description: Create a detailed text prompt for image generation based on a simple user description. Use this when the user wants to generate an image, but doesnt have an image generator available in the current context
---


# Create image prompt
You will help the user create a detailed text prompt for image generation based on a simple user description. This is useful when the user wants to generate an image, but doesn't have an image generator available in the current context.



## Style injection
The following style is extracted from existing presentation assets and is meant to be injected into the image prompt whenever the user requests an image that should match the style of the presentation. The style is described in detail to ensure that the generated image will be visually consistent with the presentation's design language. Always include this style description in the prompt when the user asks for an image that should fit within the presentation's aesthetic.

```
Style-only image prompt
Create the image in a minimalistic flat vector illustration style with a calm, official, Dutch government / corporate editorial feel. The visual language must be clean, spacious, restrained, and highly readable, with very low visual complexity and large areas of negative space around the main forms. The composition should feel open and balanced, not crowded, and should leave generous breathing room on the canvas.

Use a restrained palette dominated by:

deep government blue #154273
very light blue #DDEFF8
light blue #8FCAE7
pale blue #B5DDEF / #B6DDEF
white #FFFFFF
Optional accent colors may be used very sparingly only:
Prefer the lighter colors

orange #E17000
magenta #A90061
Style requirements:

flat design only
simple geometric shapes
clean silhouettes
crisp edges
minimal internal detail
clear recognizable forms
muted, restrained colors
professional and trustworthy tone
presentation-friendly composition
large empty background areas
low-density layout
no clutter
Do not use:

gradients
textures
photorealism
3D rendering
glossy effects
dramatic lighting
heavy shadows
intricate details
ornamental decoration
dense backgrounds
complex patterns
sketchiness
visual noise
Composition requirements:

keep the illustration airy and spacious
use wide margins and clear separation between elements
avoid filling the whole frame
avoid busy scenes unless explicitly requested
reduce environment/background elements to a few flat structural shapes only
favor one clear focal subject or a very small number of grouped elements
If people are shown:

keep them simplified and generic
place them in neutral everyday settings
avoid exaggerated expression or caricature
keep clothing and features understated and non-distracting
Text rule:

Do not add any text, labels, captions, signage, letters, numbers, logos, or typography unless the user explicitly asks for text
if text is not explicitly requested, the image must remain purely visual
Overall result:

an understated, minimal, flat illustration suitable for an official public-sector presentation slide
calm, structured, accessible, and uncluttered
visually consistent with modern government communication graphics
Short version
Minimalistic flat vector illustration, calm Dutch government editorial style, spacious composition, lots of negative space, white and pale-blue dominant palette, deep blue structural accents, very low detail, simple geometric forms, crisp edges, no gradients, no textures, no realism, no 3D, no heavy shadows, no clutter, no intricate detail, no text unless explicitly requested.

Negative prompt
photorealistic, 3D, gradients, texture, grain, glossy, reflective, cinematic lighting, dramatic shadows, cluttered layout, dense background, intricate detail, ornamental patterns, sketch style, saturated neon colors, typography, letters, numbers, labels, captions, logos, signage
```

## User instructions
The user should provide enough details of the desired image to create the prompt. Make a judgement call on whether more information is needed based the complexity of the request and the amount of details given by the user.
Ask follow-up questions if necessary to clarify the user's vision for the image, such as:
- What is the main subject or focal point of the image?
- What message should the image convey?
- How should the composition be structured (e.g. centered, balanced, asymmetrical)?
- Where in the presentation will the image be used (e.g. title slide, content slide, closing slide, right half, left half, quarter)?
- Should the image be more abstract or literal in its representation?


## Output format
You will output the prompt by combining the user specification with the style description. The output should be a single text block that can be directly used as a prompt for an image generation model. Make sure to include all relevant details from the user and the style guidelines to ensure the generated image matches the desired aesthetic and content requirements.


You will output your prompt in a markdown code block for easy copying. The prompt should be clear, concise, and well-structured to guide the image generation process effectively.
Below the prompt give links to gemini, openai, anthropic that are clickable (meaning use markdown link syntax). with the instruction for the user to copy the prompt, put it in a chat, enable the image generation tool and ask for the image to be generated.