<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

        <script src="../js/app.js"></script>
    </head>
    <body>
        <select name="tabla" id="tabla">
            <option value="avatares">avatares</option>
            <option value="cartas">cartas</option>
            <option value="enemigos">enemigos</option>
            <option value="personajes">personajes</option>
            <option value="recompensas">recompensas</option>
            <option value="usuarios">usuarios</option>
        </select>

        <form name="formulario" action="http://127.0.0.1:8000/api/registrar" method="post">

            <input class="controls" type="text" name="usuario" placeholder="Usuario" required>

            <input class="controls" type="email" name="email" placeholder="Correo electrónico" required>

            <input class="controls" type="password" id="contrasena" name="contrasena" placeholder="Contraseña" required>

            <input class="botons" type="submit" name="registrarse" value="Registrarse">
</form>
    </body>
</html>
