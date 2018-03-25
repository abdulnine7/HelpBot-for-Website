<?php
$question=$_GET['question'];
$sessionid=$_GET['sessionid'];
$question = str_replace(' ', '+', $question);

$destinationURL = 'http://127.0.0.1:8989/api/v1.0/ask';
$url = $destinationURL . "?question=" . $question . "&&sessionid=" . $sessionid;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_TIMEOUT, 80);
 
$response = curl_exec($ch);
 
if(curl_error($ch)){
	echo 'Request Error:' . curl_error($ch);
}
else
{
	echo $response;
}
 
curl_close($ch);