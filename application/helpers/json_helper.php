<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 *
 * 判断是否存在json_encode函数
 * 没有则定义之
 * 注：PHP 5.2以上才有json函数
 */
if ( ! function_exists ('json_encode') )
{
    function json_encode($var)
    {
        $CI = & get_instance();
        $CI->load->library('json');
        return $CI->json->encode($var);
    }
}

if ( ! function_exists( 'json_decode' ) )
{
    function json_decode($var)
    {
        $CI = & get_instance();
        $CI->load->library('json');
        return $CI->json->decode($var);
    }
}

//str_getcsv在PHP5.3以上才有
//http://www.php.net/manual/en/function.str-getcsv.php#98088
if (!function_exists('str_getcsv')) {
    function str_getcsv($input, $delimiter = ',', $enclosure = '"', $escape = '\\', $eol = '\n') {
        if (is_string($input) && !empty($input)) {
            $output = array();
            $tmp    = preg_split("/".$eol."/",$input);
            if (is_array($tmp) && !empty($tmp)) {
                while (list($line_num, $line) = each($tmp)) {
                    if (preg_match("/".$escape.$enclosure."/",$line)) {
                        while ($strlen = strlen($line)) {
                            $pos_delimiter       = strpos($line,$delimiter);
                            $pos_enclosure_start = strpos($line,$enclosure);
                            if (
                                is_int($pos_delimiter) && is_int($pos_enclosure_start)
                                && ($pos_enclosure_start < $pos_delimiter)
                            ) {
                                $enclosed_str = substr($line,1);
                                $pos_enclosure_end = strpos($enclosed_str,$enclosure);
                                $enclosed_str = substr($enclosed_str,0,$pos_enclosure_end);
                                $output[$line_num][] = $enclosed_str;
                                $offset = $pos_enclosure_end+3;
                            } else {
                                if (empty($pos_delimiter) && empty($pos_enclosure_start)) {
                                    $output[$line_num][] = substr($line,0);
                                    $offset = strlen($line);
                                } else {
                                    $output[$line_num][] = substr($line,0,$pos_delimiter);
                                    $offset = (
                                        !empty($pos_enclosure_start)
                                        && ($pos_enclosure_start < $pos_delimiter)
                                    )
                                    ?$pos_enclosure_start
                                    :$pos_delimiter+1;
                                }
                            }
                            $line = substr($line,$offset);
                        }
                    } else {
                        $line = preg_split("/".$delimiter."/",$line);

                        /*
                         * Validating against pesky extra line breaks creating false rows.
                         */
                        if (is_array($line) && !empty($line[0])) {
                            $output[$line_num] = $line;
                        } 
                    }
                }
                return $output;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
} 
