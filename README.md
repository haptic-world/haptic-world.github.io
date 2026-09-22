# HapticWorld project page

Source for [hapticworld-anon.github.io](https://hapticworld-anon.github.io), built on the
[Nerfies](https://github.com/nerfies/nerfies.github.io) template (Bulma + jQuery, no build step).
Author information is anonymized for double-blind review.

## Adding media

Every video/image slot on the page checks whether its file exists. If the file is missing, a
labelled placeholder is shown instead; drop the file in with the exact name below and it appears
without editing `index.html`.

### Videos (`static/videos/`)

| File | Section | Content |
|------|---------|---------|
| `teaser.mp4` | Hero | Optional. Until it exists, Fig. 1 of the paper is shown. |
| `long_horizon_teleop.mp4` | Long-horizon | 2+ min uncut teleoperation inside HapticWorld. |
| `kettlebell.mp4` | Qualitative | Pushing the 5 / 10 / 15 lb kettlebells inside HapticWorld (real world + HapticWorld + force). |
| `slingshot_1.mp4` … `slingshot_4.mp4` | Qualitative | Four slingshot shots (yellow / red / blue / green zone), cropped from the 2×2 source video. |
| `hardware_play_data.mp4` | Tasks and Data Collection | Play-data collection on the real robot (leader/follower setup). |
| `{task}_rollout_composite.mp4` | Q3 | 2×2 composite: policy w/o torque (IWS) vs. HapticWorld policy, real world vs. simulator. Switched by the Q3 task dropdown. |
| `{task}_iws_real_{k}.mp4` | Q3 | Vision-only IWS pipeline policy, real-world rollout. |
| `{task}_realdata_real_{k}.mp4` | Q3 | Torque policy trained on real-world data, real-world rollout. |
| `{task}_hapticworld_real_{k}.mp4` | Q3 | Torque policy trained on HapticWorld data, real-world rollout. |
| `{task}_realdata_sim_{k}.mp4` | Q4 | Torque policy trained on real-world data, rolled out inside HapticWorld. |
| `{task}_hapticworld_sim_{k}.mp4` | Q4 | Torque policy trained on HapticWorld data, rolled out inside HapticWorld. |
| `{task}_iws_sim_{k}.mp4` | Q4 | Vision-only IWS policy, rolled out inside IWS. |

`{task}` is `microwave`, `whiteboard` or `box`; `{k}` is 1–3 (the "Video" dropdown). All rollouts
are real time. Source clips were named `{i|it}_{sim|real}_{sim|real}_{n}` (policy input,
training data, evaluation platform); they were re-encoded with
`ffmpeg -c:v libx264 -crf 28 -an -movflags +faststart`. The `whiteboard_iws_real_*` clips came
from `wipping/it_simwot_real_*` with the torque strip cropped off (`crop=1024:768:0:0`).
Temporary duplicates until more clips exist: `{microwave,whiteboard,box}_iws_real_3` and
`whiteboard_realdata_sim_3` are copies of the corresponding `_1` file.

Q2 (data-collection throughput) has no videos, only the table. All 4K sources were encoded to 1280 px wide, 30 fps, `-crf 24`.

Use H.264 MP4 (`-pix_fmt yuv420p`) so Safari plays them. Keep each file under ~20 MB.

### Images (`static/images/`)

Torque-prediction plots for the Q1 task switcher are already in place:
`torque_microwave.png`, `torque_whiteboard.png`, `torque_box.png`. Figures from the paper: `fig1_teaser.jpg`, `fig2_overview.png`, `fig3_tasks.jpg`.
Poster frames for every video live in `static/images/posters/`.

### Task switchers

Q1–Q4 each have a dropdown next to the heading (`select.task-select`) that shows one
`div.task-panel` at a time. To add a task, add an `<option>` and a matching panel with the same
`data-switcher` / `data-task` values.

## Remaining TODOs in `index.html`

- Paper / Video / Code button links (currently `#`).
- Playback-speed labels in captions if videos are sped up (e.g. "(2x)").

## Preview locally

```bash
python3 -m http.server 8000
```

then open <http://localhost:8000>.

## Deploy

GitHub Pages serves the `main` branch. Push to `main` and the site updates in about a minute.

## License

Website content is licensed under
[CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/), same as the template.
