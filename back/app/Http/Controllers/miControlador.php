<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class miControlador extends Controller
{
    public function act_record(Request $req){
        $usuario = $req->get('nombre');
        $record = $req->get('record');

        try{

            $act = DB::table('usuarios')
            ->where('usuario', $usuario)
            ->update(['record'=> $record]);

            return response()->json(['mensaje'=>'Record actualizado'],200);

        }catch (\Illuminate\Database\QueryException $e){
            return response()->json(['mensaje'=>$e],200);

        }


    }

    public function login(Request $req){

        $nombre = $req->get('nombre');
        $pass = $req->get('contrasena');

        $data = DB::table('usuarios')
        ->select('usuario','email','avatar','record')
        ->where('usuario', '=', $nombre)
        ->where('contraseña', '=', $pass)
        ->get();

        return response()->json($data,200);
    }

    public function cartas(){
        $cartas = DB::table('cartas')
        ->select('valor','tipo','cantidad','imagen')
        ->where('id_personaje', '=', 1)
        ->get();

        // return response()->json($cartas,200);
        return response()->json($cartas,200);
    }

    public function enemigos(){
        $enemigos = DB::table('enemigos')
        ->select('nombre','vida','ataque', 'nivel','imagen')
        ->orderBy('nivel', 'asc')
        ->get();

        return response()->json($enemigos,200);
    }

    public function imagenes(){
        $imagenes = DB::table('avatares')
        ->select('imagen')
        ->get();

        return response()->json($imagenes,200);
    }

    public function personajes() {
        $personaje = DB::table('personajes')
        ->select('nombre','imagen', 'vida_maxima')
        ->where('uid', '=', 1)
        ->get();

        return response()->json($personaje,200);
    }

    public function recompensas() {
        $recompensas = DB::table('recompensas')->get();

        return response()->json($recompensas,200);
    }

    public function usuario() {
        $usu = DB::table('usuarios')
        ->select('record','avatar')
        ->where('usuario', '=', $usuario)
        ->get();

        return response()->json($usu,200);
    }

    public function registrar(Request $req) {

        $usuario = $req->get("usuario");
        $email = $req->get("email");
        $contrasena = $req->get("contrasena");
        $imagen = $req->get("imagen");

            try{

                DB::table('usuarios')->insert(['usuario' => $usuario, 'email' => $email, 'contraseña' => $contrasena, 'avatar'=>$imagen ,'record' => 0]);

                return response()->json(['mensaje'=>'Insertado'],200);

            }catch (\Illuminate\Database\QueryException $e){
                return response()->json(['mensaje'=>$e],200);

            }
    }

}
