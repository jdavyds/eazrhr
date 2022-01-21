  $(document).ready(function() {
    $('.video-modal').on('hidden.bs.modal', function() {
      var $this = $(this).find('iframe'),
        tempSrc = $this.attr('src');
      $this.attr('src', "");
      $this.attr('src', tempSrc);
    });
    $(".toggleMenu").on('click', function() {
      $("#mobileMenu").toggleClass("active");
    });
    $('.partners.owl-carousel').owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      dots: false,
      navText: [
        "<i class='ti-arrow-left'></i>",
        "<i class='ti-arrow-right'></i>"
      ],
      autoplay: true,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 2
        },
        600: {
          items: 3
        },
        1000: {
          items: 5
        }
      }
    });
    $(".collapse.show").each(function() {
      $(this)
        .prev(".card-header")
        .find(".ui-accordion__control")
        .addClass("ti-minus")
        .removeClass("ti-plus");
    });
    // Toggle plus minus icon on show hide of collapse element
    $(".collapse")
      .on("show.bs.collapse", function() {
        $(this)
          .prev(".card-header")
          .find(".ui-accordion__control")
          .removeClass("ti-plus")
          .addClass("ti-minus");
      })
      .on("hide.bs.collapse", function() {
        $(this)
          .prev(".card-header")
          .find(".ui-accordion__control")
          .removeClass("ti-minus")
          .addClass("ti-plus");
      });
    var price = $('.pricing-table__price');
    var year = $("#year");
    var month = $("#month");
    year.on('click', function() {
      $(this).addClass('active');
      month.removeClass('active');
      $('.price-year-month').text('year')
      price.each(function() {
        $(this).text($(this).data('year-price'));
      });
    });
    month.on('click', function() {
      $(this).addClass('active');
      year.removeClass('active');
      $('.price-year-month').text('month')
      price.each(function() {
        $(this).text($(this).data('month-price'));
      });
    });
    $('.countrySelect').change(function(e) {
      $('.fetchStates').css('display', 'block');
      let options = [];
      var select = document.querySelector(".stateSelect#stateSelect");
      var length = select.options.length;
      for (i = length - 1; i >= 0; i--) {
        select.options[i] = null;
      }
      axios.post('https://countriesnow.space/api/v0.1/countries/states', {
          "country": $(this).val()
        })
        .then(function(response) {
          const states = response.data.data.states;
          $('.fetchStates').css('display', 'none');
          states.forEach(state => {
            options.push(state.name)
          })
          for (var i = 0; i < options.length; i++) {
            var opt = options[i];
            var el = document.createElement("option");
            el.text = opt;
            el.value = opt;
            select.add(el);
          }
          if (options.length < 1) {
            $('.stateSelect').css('display', 'none');
            $('.stateSelectOthers').css('display', 'block');
          } else {
            $('.stateSelect').css('display', 'block');
            $('.stateSelectOthers').css('display', 'none');
          }
        })
        .catch(function(error) {
          if (error) {
            $('.stateSelect').css('display', 'none');
            $('.stateSelectOthers').css('display', 'block');
          } else {
            $('.stateSelect').css('display', 'block');
            $('.stateSelectOthers').css('display', 'none');
          }
          $('.fetchStates').css('display', 'none');
        })
      var selected_country = $(this).val();
      // if (selected_country == 'Nigeria') {
      //   $('.stateSelectNigeria').css('display', 'block');
      //   $('.stateSelectOthers').css('display', 'none');
      // } else {
      //   $('.stateSelectOthers').css('display', 'block');
      //   $('.stateSelectNigeria').css('display', 'none');
      // }
    })
    $('.othersToggle').change(function(e) {
      var selected_option = $(this).val();
      if (selected_option == 'others') {
        $('.others-option').css('display', 'block');
      } else {
        $('.others-option').css('display', 'none');
      }
    })
  });

  function yesCheck() {
    if ($("input[type='radio']:checked").val()) {
      $('.ifYes').css('visibility', 'visible')
    }
  }

  function noCheck() {
    if ($("input[type='radio']:checked").val()) {
      $('.ifYes').css('visibility', 'hidden')
    }
  }
  function setStorage() {
    const adminName = document.getElementById('admin-input').value
    localStorage.setItem('admin', adminName);
  }
  const reg = document.getElementById('reg').addEventListener('click' , setStorage)
  document.querySelector('.admin-name').innerHTML = localStorage.getItem('admin');