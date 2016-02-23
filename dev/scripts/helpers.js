/* ==========================================================================
                                Helpers Scripts
   ========================================================================== */

/* check if $el exists in the dom */
function dom_has($el)
{
    return $($el).length;
}

/* check if $fn is a function */
function is_function($fn) 
{
    return typeof $fn === 'function';
}

/* check if $arr is a function */
function is_array($arr) 
{
    return $arr instanceof Array;
}

/* Visit a URL */
function visit($url)
{
    window.location.href = $url;
}


function default_value($value, $def)
{
    return $value == undefined ? $def : $value;
}

function get($data, $url, $fn_success, $fn_failure, $dataType)
{
    $dataType = default_value($dataType, 'json');

    $.ajax({
        data: data,
        url: url,
        dataType: $dataType,
        success: $fn_success,
        error: $fn_failure 
    });
}

function post($data, $url, $fn_success, $fn_failure, $dataType)
{
    $dataType = default_value($dataType, 'json');

    $.ajax({
        data: data,
        url: url,
        dataType: $dataType,
        success: $fn_success,
        error: $fn_failure
    });
}


function make_google_map($obj, $coords, $wrapper)
{
    $wrapper = default_value($wrapper, 'gmap-wrapper');
}

function make_pair($first, $second)
{
    return {
        first: $first,
        second: $second
    };
}

function number_format(number, decimals, dec_point, thousands_sep)
{
    number = (number + '')
        .replace(/[^0-9+\-Ee.]/g, '');
    var n = ! isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + (Math.round(n * k) / k)
            .toFixed(prec);
        };

    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
        .split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1)
        .join('0');
    }

    return s.join(dec);
}

function ltrim(str, charlist) 
{
    charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
        .replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');

    var re = new RegExp('^[' + charlist + ']+', 'g');

    return (str + '').replace(re, '');
}

function rtrim(str, charlist) 
{
    charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
        .replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\\$1');

    var re = new RegExp('[' + charlist + ']+$', 'g');

    return (str + '').replace(re, '');
}

function json($data)
{
    return JSON.parse($data);
}

function string($json)
{
    return JSON.stringify($json);
}

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};