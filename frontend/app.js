const BASE = "http://127.0.0.1:8000";
const CATEGORIAS_DESEADAS = ["zapatos", "camisetas", "conjuntos"];
const tienda = document.getElementById("tienda");

// 1. Trae todas las categorías
fetch(BASE + "/api/categories/")
  .then(res => res.json())
  .then(categorias => {

    // 2. Trae todos los productos una sola vez
    fetch(BASE + "/api/products/")
      .then(res => res.json())
      .then(productos => {

        // 3. Recorre las categorías deseadas
        categorias.forEach(cat => {
          const nombre = cat.name.toLowerCase();

          if (!CATEGORIAS_DESEADAS.includes(nombre)) return;

          // Crear sección
          const section = document.createElement("section");

          const h2 = document.createElement("h2");
          h2.textContent = cat.name;
          section.appendChild(h2);

          const grid = document.createElement("div");
          grid.className = "grid";
          section.appendChild(grid);

          tienda.appendChild(section);

          // 4. Filtrar productos por category_id
          const productosFiltrados = productos.filter(p => p.category_id === cat.id);

          // 5. Mostrar productos
          productosFiltrados.slice(0, 5).forEach(producto => {
            const article = document.createElement("article");

            const figure = document.createElement("figure");
            const img = document.createElement("img");

            img.src = producto.images;
            img.alt = producto.title;

            figure.appendChild(img);

            const info = document.createElement("div");
            info.className = "info";

            const nombre = document.createElement("h3");
            nombre.textContent = producto.title;

            const precio = document.createElement("p");
            precio.className = "precio";
            precio.textContent = "$" + producto.price;

            const desc = document.createElement("p");
            desc.className = "descripcion";
            desc.textContent = producto.description;

            info.appendChild(nombre);
            info.appendChild(precio);
            info.appendChild(desc);

            article.appendChild(figure);
            article.appendChild(info);

            grid.appendChild(article);
          });
        });
      });
  });
