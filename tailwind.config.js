module.exports = {
  mode: "jit",
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-page":
          "url('/src/assets/login_bg.jpg')",
        "logged-in":
          "url('/src/assets/homescreen.jpg')",
      },
    },
  },
  plugins: [],
};
