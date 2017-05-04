<?php
class connection{
	private $server = "50.62.209.109";
	private $user = "154624156";
	private $password = "Videoextrem88231909";
	private $database = "video_extrem";

	function connect()
	{
		return mysql_connect($this->server,$this->user,$this->password);
	}

	function consult($sql)
	{
		$conection = $this -> connect();
		mysql_set_charset('utf8');
		mysql_select_db($this->database, $conection);
		return mysql_query($sql,$conection);
	}
	
	function printTest(){
		echo "Que cagada";
	}
}
?>