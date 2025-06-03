# 🚀 AgdayoUI

Traveling App

## 📦 Tech Stack

- **Frontend**: [Astro](https://astro.build/) + [Vue 3](https://vuejs.org/) + TailwindCSS
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/) + [SQLModel](https://sqlmodel.tiangolo.com/)
- **Auth**: JWT-based auth stored in HTTP-only cookies
- **UI/UX**: Fully responsive, dark mode, toast messages, transitions

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

## 📜 License

MIT License © 2025 MindHue Technologies Incorporated

## Payload

### /login
```
{
    email: String,
    password: String,
    rememberMe: Boolean, // not needed
}
```

### /register
```
{
    email: String,
    password: String,
}
```

### /build-profile
```
{
    homeProvince: String,
    hasExperience: Boolean,
    spentVacations: Array of Strings,
    heardUs: String,
}
```