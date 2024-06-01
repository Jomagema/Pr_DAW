<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\miControlador;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::put('act_record', [miControlador::class, 'act_record']);
Route::get('cartas', [miControlador::class, 'cartas']);
Route::get('enemigos', [miControlador::class, 'enemigos']);
Route::get('imagenes', [miControlador::class, 'imagenes']);
Route::get('personajes', [miControlador::class, 'personajes']);
Route::get('recompensas', [miControlador::class, 'recompensas']);
Route::post('usuario', [miControlador::class, 'usuario']);
Route::post('registrar', [miControlador::class, 'registrar']);
Route::post('login', [miControlador::class, 'login']);
