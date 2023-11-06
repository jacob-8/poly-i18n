# Advanced Options (WIP)

## Bilingual language support

I use i18n on a tool for language learners. Imagine an English speaker is learning Mandarin. At first they want the tool interface to be in English. But as they learn more and more Mandarin, they want to see the Mandarin translation of the interface, but not all at once. That would overwhelm, so I want them to be able to see both languages until they are ready to switch fully to using Mandarin. You can read the source for this repo to see how this pulled off, but it's extremely simple to add since we have a DIY solution. It'd be impossible using any of the current libraries, since it's such a niche use case that no one supports. This is the reason I call my i18n solution `poly-i18n` by the way.

## Check for a user's 2nd or 3rd preferred locale

Sometimes a user's 1st locale is not supported but they have another preference that works. We can do it this way:

## Right-to-left support

Check the source for how to do it.