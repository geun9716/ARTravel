var request = require('request');

var url = 'http://api.data.go.kr/openapi/tn_pubr_public_trrsrt_api';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=g10Sxt9jmtIMest6P%2Bnhqw1SOvEshkBbfQrXP5Yjh0i8ZkSUwRMWKGahAT4QNyDjw0hVJc45OYixufIYmy9Cjw%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('0'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('600'); /* */
queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('json'); /* */
queryParams += '&' + encodeURIComponent('trrsrtNm') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('trrsrtSe') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('rdnmadr') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('lnmadr') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('latitude') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('longitude') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('ar') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('cnvnncFclty') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('stayngInfo') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('mvmAmsmtFclty') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('recrtClturFclty') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('hospitalityFclty') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('sportFclty') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('appnDate') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('aceptncCo') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('prkplceCo') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('trrsrtIntrcn') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('phoneNumber') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('institutionNm') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('referenceDate') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('instt_code') + '=' + encodeURIComponent(''); /* */
queryParams += '&' + encodeURIComponent('instt_nm') + '=' + encodeURIComponent(''); /* */

request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    console.log('Status', response.statusCode);
    console.log('Headers', JSON.stringify(response.headers));
    // console.log('Reponse received', JSON.parse(response));
});