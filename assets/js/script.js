// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Tema oscuro/claro
  const themeToggle = document.getElementById("theme-toggle")
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")

  // Verificar si hay un tema guardado en localStorage
  const currentTheme = localStorage.getItem("theme")
  if (currentTheme === "dark") {
    document.body.setAttribute("data-theme", "dark")
  } else if (currentTheme === "light") {
    document.body.setAttribute("data-theme", "light")
  } else if (prefersDarkScheme.matches) {
    // Si no hay tema guardado pero el sistema prefiere oscuro
    document.body.setAttribute("data-theme", "dark")
  }

  // Actualizar el icono según el tema actual
  updateThemeIcon()

  // Manejar el clic en el botón de tema
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      let theme
      if (document.body.getAttribute("data-theme") === "dark") {
        document.body.removeAttribute("data-theme")
        theme = "light"
      } else {
        document.body.setAttribute("data-theme", "dark")
        theme = "dark"
      }
      localStorage.setItem("theme", theme)
      updateThemeIcon()
    })
  }

  // Función para actualizar el icono según el tema
  function updateThemeIcon() {
    const themeIcon = themeToggle.querySelector("i")
    if (document.body.getAttribute("data-theme") === "dark") {
      themeIcon.classList.remove("fa-moon")
      themeIcon.classList.add("fa-sun")
    } else {
      themeIcon.classList.remove("fa-sun")
      themeIcon.classList.add("fa-moon")
    }
  }

  // Actualizar el año actual en el footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Navegación móvil
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active")
      const spans = this.querySelectorAll("span")
      spans[0].classList.toggle("rotate-45")
      spans[1].classList.toggle("opacity-0")
      spans[2].classList.toggle("rotate-neg-45")
    })
  }

  // Cerrar menú móvil al hacer clic en un enlace
  const navItems = document.querySelectorAll(".nav-links a")
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("active")
    })
  })

  // Resaltar enlace activo en la navegación
  const sections = document.querySelectorAll(".section")
  const navLinksItems = document.querySelectorAll(".nav-links a")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id")
      }
    })

    navLinksItems.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active")
      }
    })
  })

  // Validación del formulario de contacto
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Obtener valores del formulario
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Validación básica
      if (!name || !email || !subject || !message) {
        alert("Por favor, completa todos los campos.")
        return
      }

      // Validación de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Por favor, introduce un correo electrónico válido.")
        return
      }

      // Aquí normalmente enviarías los datos a un servidor
      // Como es un ejemplo, solo mostraremos un mensaje de éxito
      alert("¡Mensaje enviado con éxito! Te responderé lo antes posible.")
      contactForm.reset()
    })
  }

  // Animación suave para los enlaces de navegación
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        })
      }
    })
  })
})
