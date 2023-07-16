
// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})


//Calculate Tip
function calculateTip() {
    var billAmt = document.getElementById("billamt").value;
    var serviceQual = document.getElementById("serviceQual2").value;
    var numOfPeople = document.getElementById("peopleamt").value;
  
    //validate input
    if (billAmt === "" || serviceQual == 0) {
      alert("Please enter values");
      return;
    }
    //Check to see if this input is empty or less than or equal to 1
    if (numOfPeople === "" || numOfPeople <= 1) {
      numOfPeople = 1;
      document.getElementById("each").style.display = "none";
    } else {
      document.getElementById("each").style.display = "block";
    }
  
    //Calculate tip
    var total = numOfPeople / (16*(serviceQual/400));
    total = Math.round(total * 100) / 100;
    var jjj = (serviceQual*numOfPeople)/454 - ((serviceQual/4)*numOfPeople)/454;
    jjj = Math.round(jjj * 100) / 100;
   
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("totalTip2").style.display = "block";
    document.getElementById("tip2").innerHTML = total;
    document.getElementById("tip").innerHTML = jjj;
 
  
  }
  
  //Hide the tip amount on load
  document.getElementById("totalTip").style.display = "none";
  document.getElementById("totalTip2").style.display = "none";
  document.getElementById("each").style.display = "none";
  
  //click to call function
  document.getElementById("calculate").onclick = function() {
    calculateTip();
  
  };
  
  
  const percentageArray = [28, 25, 23, 13, 11];
const answerArray = ['Transportation', 'Electric Power', 'Industry', 'Commercial/Residential', 'Agriculture'];

$.fn.createBarchart = function (optionvariables) {
  var chartContainer = $(this);
  var defaults = {
    'maxWidth': 244
  };
  var options = $.extend({}, defaults, optionvariables);
  var self = $(this),
      graphContainer = self.parent().find('.graph-container .graph'),
      barChart = $('<ul/>', { class: 'bar-chart' });
    
  barChart.appendTo(chartContainer);
    
  $.each(answerArray, function(index, value) {
    var chartAnswer = $('<li/>', { class: 'answer-' + index }),
        answerLabel = $('<span/>', { class: 'label', text: value }),
        percentageValue = percentageArray[index].toString(),
        answerPercentage = $('<span/>', { class: 'percentage', text: percentageValue.replace('.', ',') + '%' }),
        barTrack = $('<span/>', { class: 'bar-track' }),
        bar = $('<span />', { class: 'bar', style: 'width: ' + percentageValue + '%;' });
    
    chartAnswer.appendTo(barChart);
    answerLabel.appendTo(chartAnswer);
    answerPercentage.appendTo(chartAnswer);
    barTrack.appendTo(chartAnswer);
    bar.appendTo(barTrack);
  });
  
  barChart.chart(
		{
			graphContainer: graphContainer
		}
	);
};

$.fn.chart = function (optionvariables) {
  var chart = $(this);
  var defaults = {
    'canvasSize': 220,
    'graphContainer': $('.graph-container .graph')
  };
  var options = $.extend({}, defaults, optionvariables);
  
  return chart.each(function () {
    var listItem = chart.find('li'),
        listItems = listItem.length,
        canvas = document.createElement('canvas'),
        canvasWidth = options.canvasSize,
        canvasHeight = options.canvasSize,
        graphContainer = options.graphContainer,
        total = 0,
        totalPercentage = 0,
        data = [],
        newData = [],
        i = 0,
        startingAngle,
        arcSize,
        endingAngle;

    $.each(percentageArray, function(index, value) {
      newData.push(3.6 * value);
    });
    
    function sumTo(a, i) {
      var sum = 0;
      for (var j = 0; j < i; j++) {
        sum += a[j];
      }
      return sum - 90;
    }
    
    function degreesToRadians(degrees) {
      return ((degrees * Math.PI)/180);
    }
    
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.setAttribute('id', 'chartCanvas');
    graphContainer.append(canvas);
    
    var cvs = document.getElementById('chartCanvas'),
        ctx = cvs.getContext('2d'),
        centerX = canvasWidth / 2,
        centerY = canvasHeight / 2,
        radius = canvasWidth / 2;
    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    listItem.each(function(e) {
      startingAngle = degreesToRadians(sumTo(newData, i));
      arcSize = degreesToRadians(newData[i]);
      endingAngle = startingAngle + arcSize;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startingAngle, endingAngle, false);
      ctx.closePath();
      ctx.fillStyle = $(this).find('.bar').css('backgroundColor');
      ctx.fill();
      ctx.restore();
      i++;
    });
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius * .45, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fillStyle = $('body').css('backgroundColor');
    ctx.fill();
  });
};

$('#live-poll-area .answer-list').createBarchart();

var string = "The EcoEfficiency Analyzer";
var str = string.split("");
var el = document.getElementById('str');
(function animate() {
str.length > 0 ? el.innerHTML += str.shift() : clearTimeout(running); 
var running = setTimeout(animate, 160);
})();

document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.elements.name.value = '';
    e.target.elements.email.value = '';
    e.target.elements.message.value = '';
  });

  getPagination('#table-id');
  $('#maxRows').trigger('change');
  function getPagination (table){

        $('#maxRows').on('change',function(){
            $('.pagination').html('');						// reset pagination div
            var trnum = 0 ;									// reset tr counter 
            var maxRows = parseInt($(this).val());			// get Max Rows from select option
      
            var totalRows = $(table+' tbody tr').length;		// numbers of rows 
           $(table+' tr:gt(0)').each(function(){			// each TR in  table and not the header
               trnum++;									// Start Counter 
               if (trnum > maxRows ){						// if tr number gt maxRows
                   
                   $(this).hide();							// fade it out 
               }if (trnum <= maxRows ){$(this).show();}// else fade in Important in case if it ..
           });											//  was fade out to fade it in 
           if (totalRows > maxRows){						// if tr total rows gt max rows option
               var pagenum = Math.ceil(totalRows/maxRows);	// ceil total(rows/maxrows) to get ..  
                                                           //	numbers of pages 
               for (var i = 1; i <= pagenum ;){			// for each page append pagination li 
               $('.pagination').append('<li data-page="'+i+'">\
                                    <span>'+ i++ +'<span class="sr-only">(current)</span></span>\
                                  </li>').show();
               }											// end for i 
   
       
          } 												// end if row count > max rows
          $('.pagination li:first-child').addClass('active'); // add active class to the first li 
      
      
      //SHOWING ROWS NUMBER OUT OF TOTAL DEFAULT
     showig_rows_count(maxRows, 1, totalRows);
      //SHOWING ROWS NUMBER OUT OF TOTAL DEFAULT

      $('.pagination li').on('click',function(e){		// on click each page
      e.preventDefault();
              var pageNum = $(this).attr('data-page');	// get it's number
              var trIndex = 0 ;							// reset tr counter
              $('.pagination li').removeClass('active');	// remove active class from all li 
              $(this).addClass('active');					// add active class to the clicked 
      
      
      //SHOWING ROWS NUMBER OUT OF TOTAL
     showig_rows_count(maxRows, pageNum, totalRows);
      //SHOWING ROWS NUMBER OUT OF TOTAL
      
      
      
               $(table+' tr:gt(0)').each(function(){		// each tr in table not the header
                   trIndex++;								// tr index counter 
                   // if tr index gt maxRows*pageNum or lt maxRows*pageNum-maxRows fade if out
                   if (trIndex > (maxRows*pageNum) || trIndex <= ((maxRows*pageNum)-maxRows)){
                       $(this).hide();		
                   }else {$(this).show();} 				//else fade in 
               }); 										// end of for each tr in table
                  });										// end of on click pagination list
      });
                                          // end of on select change 
       
                              // END OF PAGINATION 
  
  }	


          

// SI SETTING
$(function(){
  // Just to append id number for each row  
default_index();
                  
});

//ROWS SHOWING FUNCTION
function showig_rows_count(maxRows, pageNum, totalRows) {
 //Default rows showing
      var end_index = maxRows*pageNum;
      var start_index = ((maxRows*pageNum)- maxRows) + parseFloat(1);
      var string = 'Showing '+ start_index + ' to ' + end_index +' of ' + totalRows + ' entries';               
      $('.rows_count').html(string);
}

// CREATING INDEX
function default_index() {
$('table tr:eq(0)').prepend('<th> ID </th>')

                  var id = 0;

                  $('table tr:gt(0)').each(function(){	
                      id++
                      $(this).prepend('<td>'+id+'</td>');
                  });
}

// All Table search script
function FilterkeyWord_all_table() {

// Count td if you want to search on all table instead of specific column

var count = $('.table').children('tbody').children('tr:first-child').children('td').length; 

      // Declare variables
var input, filter, table, tr, td, i;
input = document.getElementById("search_input_all");
var input_value =     document.getElementById("search_input_all").value;
      filter = input.value.toLowerCase();
if(input_value !=''){
      table = document.getElementById("table-id");
      tr = table.getElementsByTagName("tr");

      // Loop through all table rows, and hide those who don't match the search query
      for (i = 1; i < tr.length; i++) {
        
        var flag = 0;
         
        for(j = 0; j < count; j++){
          td = tr[i].getElementsByTagName("td")[j];
          if (td) {
           
              var td_text = td.innerHTML;  
              if (td.innerHTML.toLowerCase().indexOf(filter) > -1) {
              //var td_text = td.innerHTML;  
              //td.innerHTML = 'shaban';
                flag = 1;
              } else {
                //DO NOTHING
              }
            }
          }
        if(flag==1){
                   tr[i].style.display = "";
        }else {
           tr[i].style.display = "none";
        }
      }
  }else {
    //RESET TABLE
    $('#maxRows').trigger('change');
  }
}
