
$('#submitbtn1, #submitbtn2').click(function(e) // Income submit button clicked
{
var income;

if($(this).attr('id') == 'submitbtn1')   // Check which button clicked and therefore which page we're on
	{
	// First page
	$('#firstpage, #secondpage').toggleClass('nodisplay'); // Hide first page, show second page
	income = $('#income1').val();
	}
else // Second page
	{
	income = +($('#income2').val());
	// Make banana dance:
	$('#dance_img').attr({src: 'images/dancing.gif', alt: 'Banana dancing!'});
	}

// Calc tax:
var threshold = [0, 11500, 45000, 150000];
var rates = [0, 20, 40, 45];
var taxpayable = [];
var taxable_amount;
var total_tax = 0;

// Loop through tax bands in reverse, calculating tax for each band, from highest band to lowest, and adding to total each time:
// (We keep tax for each band stored separately so details can be displayed in a pop up modal)
for(i = rates.length - 1; i > 0; i--)
	{
	taxable_amount = income - threshold[i];	// The amount of income user has in the current tax band
	if(taxable_amount > 0)
		{
		taxpayable[i] = taxable_amount * (rates[i] / 100); // Calc tax for this band
		income -= taxable_amount; // Reduce income by tax bracket
		}
	else taxpayable[i] = 0;

	// Fill in details table in pop up modal:
	// Future expansion: could easily empty table then live generate rows, for any size table
	if(rates[i] > 0) $('#table-' + rates[i]).text(taxpayable[i]);
	
	total_tax += taxpayable[i];
	}

$('#taxpayable').text(total_tax); // Display the value
});

$('#income2').focus(function(e) // Income input on 2nd page activated
{
// Put banana to sleep by changing image:
$('#dance_img').attr({src: 'images/sleeping.gif', alt: 'Banana sleeping...'})
});