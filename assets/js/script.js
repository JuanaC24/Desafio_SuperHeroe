$(document).ready(function() {
    Swal.fire({
      title: "¡Encuentra tu Superhéroe!",
      text: 'Ingrese Un Número del 1 al 732',
      customClass: {
        popup: 'custom-swal-background'
    },
      imageUrl: 'assets/img/sh1.jpg',
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Buscar",
      showLoaderOnConfirm: true,
      preConfirm: function(param) {
        return $.ajax({
          url: `https://superheroapi.com/api.php/4905856019427443/${param}`,
          method: "GET",
          dataType: "json",
          success: function(response) {
            if (response.response === "error") {
              Swal.showValidationMessage(`El superhéroe que buscas no existe`);
            }
          },
          error: function(xhr, status, error) {
            Swal.showValidationMessage(`Error al buscar el superhéroe`);
          }
        });
      }
    }).then(result => {
      console.log("result", result);
      if (!result.dismiss) {
        const superhero = result.value;

        // Mostrar la imagen y la información del superhéroe en la tarjeta
        $("#superhero-image").attr("src", superhero.image.url);
        $("#superhero-name").text(superhero.name);
        $("#superhero-biography").text(`Biografía: ${superhero.biography['full-name']}`);
        $("#superhero-work").text(`Lugar de trabajo: ${superhero.work.base}`);
        $("#superhero-connections").text(`Conexiones: ${superhero.connections['group-affiliation']}`);
        $("#superhero-publisher").text(`Apariciones: ${superhero.biography.publisher}`);
        
        // Mostrar la ventana modal con el nombre del héroe
        Swal.fire({
          title: `SuperHero Encontrado ${superhero.name}`,
          imageUrl: superhero.image.url
        });
  
        // Crear el gráfico con Chart.js y agregar un título
        let ctx = document.getElementById("myChart").getContext("2d");
        let myChart = new Chart(ctx, {
          type: "pie",
          data: {
            labels: ["Inteligencia", "Fuerza", "Velocidad", "Durabilidad", "Poder", "Combate"],
            datasets: [{
              label: "Estadísticas",
              data: [
                superhero.powerstats.intelligence,
                superhero.powerstats.strength,
                superhero.powerstats.speed,
                superhero.powerstats.durability,
                superhero.powerstats.power,
                superhero.powerstats.combat
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 206, 86, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(153, 102, 255, 0.5)",
                "rgba(255, 159, 64, 0.5)"
              ],
              borderColor: [
                "rgba(255, 99, 132)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
              borderWidth: 2
            }]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: `Estadísticas de Poder para ${superhero.name}`,
                position: "top",
                font:{
                size: 20
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    });
  });

  var mySwiper = new Swiper('.mySwiper', {
    slidesPerView: 3, // Número de diapositivas a mostrar a la vez
    spaceBetween: 30, // Espacio entre las diapositivas en px
    slidesPerGroup: 1, // Número de diapositivas a agrupar
    loop: true, // Habilita el bucle del carrusel
    loopFillGroupWithBlank: true, // Rellena los grupos con diapositivas en blanco si es necesario
    navigation: { // Configura los botones de navegación
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: { // Añade la configuración de reproducción automática
        delay: 2500, // Cambia la diapositiva cada 2.5 segundos
        disableOnInteraction: false, // Continúa con la reproducción automática después de la interacción del usuario
    },
});
