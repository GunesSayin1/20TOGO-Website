var imageWidth = 1022,
    imageHeight = 512,
    imageAspectRatio = imageWidth / imageHeight,
    $window = $(window);

var hotSpots = [{
  'title': 'Mouth',
  'description': 'scream.',
  'x': 250,
  'y': 250
}, {
  'title': 'Body',
  'description': 'Look at it.',
  'x': 10,
  'y': 2
}, {
  'title': 'Antlers',
  'description': 'They crazy.',
  'x': 4,
  'y': -17
}, {
  'title': 'This Ear',
  'description': 'It can hear things.',
  'x': -26,
  'y': -14
}];

function appendHotSpots() {
  for (var i = 0; i < hotSpots.length; i++) {
    var $hotSpot = $('<div>').addClass('hot-spot');
    $('.container1').append($hotSpot);
  }
  positionHotSpots();
}

function appendSpeechBubble() {
  var $speechBubble = $('<div>').addClass('speech-bubble');
  $('.container1').append($speechBubble);
}

function handleHotSpotMouseover(e) {
  var $currentHotSpot = $(e.currentTarget),
      currentIndex = $currentHotSpot.index(),
      $speechBubble = $('.speech-bubble'),
      title = hotSpots[currentIndex]['title'],
      description = hotSpots[currentIndex]['description'],
      hotSpotTop = $currentHotSpot.offset().top,
      hotSpotLeft = $currentHotSpot.offset().left,
      hotSpotHalfSize = $currentHotSpot.width() / 2,
      speechBubbleHalfSize = $speechBubble.width() / 2,
      topTarget = hotSpotTop - $speechBubble.height(),
      leftTarget = (hotSpotLeft - (speechBubbleHalfSize)) + hotSpotHalfSize;
  
  $speechBubble.empty();
  $speechBubble.append($('<h1>').text(title));
  $speechBubble.append($('<p>').text(description));
  
  $speechBubble.css({
    'top': topTarget - 20,
    'left': leftTarget,
    'display': 'block'
  }).stop().animate({
    opacity: 1
  }, 200);
}

function handleHotSpotMouseout(){
  var $speechBubble = $('.speech-bubble');
  $speechBubble.stop().animate({
    opacity: 0
  }, 200, function(){
    $speechBubble.hide();
  });
}

function positionHotSpots() {
  var windowWidth = $window.width(),
    windowHeight = $window.height(),
    windowAspectRatio = windowWidth / windowHeight,
    $hotSpot = $('.hot-spot');

  $hotSpot.each(function(index) {
    var xPos = hotSpots[index]['x'],
        yPos = hotSpots[index]['y'],
        desiredLeft = 0,
        desiredTop = 0;

    if (windowAspectRatio > imageAspectRatio) {
      yPos = (yPos / imageHeight) * 100;
      xPos = (xPos / imageWidth) * 100;
    } else {
      yPos = ((yPos / (windowAspectRatio / imageAspectRatio)) / imageHeight) * 100;
      xPos = ((xPos / (windowAspectRatio / imageAspectRatio)) / imageWidth) * 100;
    }

    $(this).css({
      'margin-top': yPos + '%',
      'margin-left': xPos + '%'
    });

  });
}

appendHotSpots();
appendSpeechBubble();
$(window).resize(positionHotSpots);
$('.hot-spot').on('mouseover', handleHotSpotMouseover);
$('.hot-spot').on('mouseout', handleHotSpotMouseout);