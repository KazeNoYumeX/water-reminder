# 💧 Water Reminder (喝水鬧鐘)

**English** | [繁體中文](README.zh-TW.md)

> A cross-platform (Windows / macOS) drink-water reminder. Pure front-end: no install, no backend, no tracking.

**🚀 Live version**: <https://kazenoyumex.github.io/water-reminder/>

Or download this repo and open `index.html` in your browser.

> Note: the UI is available in English and Traditional Chinese; the spoken reminder is Chinese (zh-TW) only.

## Features

- **Bilingual UI**: switch between English and 繁體中文 with the selector at the top — remembered across visits, and switchable while reminders are running. The TTS voice stays zh-TW, so the reminder phrase itself is Chinese.
- **Daily water intake calculator**: enter your weight and activity level to get your daily target
  - Formula: `weight(kg) × 30 ml + exercise bonus`
  - Exercise bonus: none 0 ml / light 350 ml / moderate 600 ml / heavy 900 ml
- **Flexible schedule**: custom start / end time and interval (30 min / 1 hour / 2 hours)
- **Automatic per-reminder amount**: the daily target is split evenly across reminders
- **Multi-channel reminders**:
  - 🔔 Desktop notifications (`requireInteraction` — stays until dismissed)
  - 🗣️ Speech (TTS) reading out a customizable phrase (default: 「該喝水了」)
  - 🍞 In-page toast banner (fallback when notifications are blocked)
  - 📱 Vibration on mobile devices
  - 🏷️ Blinking tab title
- **Natural voice selection**: automatically prefers higher-quality Chinese voices (Google 國語（臺灣）, Apple 美佳, …); manual override available
- **Mute mode**: one checkbox silences speech and the beep while keeping notifications and toasts
- **Auto-rollover**: after the last reminder of the day it schedules tomorrow's — no need to restart daily
- **Sleep-resilient**: polling-based scheduler, so missed reminders fire right after the OS wakes up
- **Persistent settings**: everything is remembered in localStorage

## Usage

### Online (recommended)

Open <https://kazenoyumex.github.io/water-reminder/>

### Locally

```bash
# Mac
open index.html

# Windows
start index.html
```

Or just double-click `index.html` in Finder / Explorer.

### Steps

1. Enter your weight and activity level → the daily target appears
2. Set start time, end time and interval → the per-reminder amount appears
3. (Optional) customize the reminder phrase and pick a voice
4. Click 「授權通知」 (Grant notifications) to allow desktop notifications
5. Click 「測試」 (Test) to verify notification, speech and toast all work
6. Click 「開始提醒」 (Start) → **keep the browser tab open**; reminders fire on schedule
7. Click 「停止」 (Stop) to end at any time

## Notes

- **The tab must stay open**: this is a pure front-end tool — closing the tab stops the reminders
- **macOS**: allow browser notifications in System Settings → Notifications, and turn off Focus mode
- **Windows**: Settings → System → Notifications → enable notifications for your browser
- **Better Chinese voices**: on macOS you can download Siri-quality voices (黎慕, 語舒) via System Settings → Accessibility → Spoken Content — a big quality difference
- Chrome, Edge and Safari recommended (any 2017+ browser works)

## Example

- 60 kg, light exercise → daily 60 × 30 + 350 = **2150 ml**
- 09:00–21:00, every 2 hours → 7 reminders
- ≈ **307 ml** per reminder

## License

MIT
