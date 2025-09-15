<?php

use App\Http\Controllers\ProfileController;

Route::get('/profiles', [ProfileController::class, 'index']);
Route::post('/profiles', [ProfileController::class, 'store']);
Route::put('/profiles/{id}', [ProfileController::class, 'update']); // <-- ADD THIS LINE
Route::delete('/profiles/{id}', [ProfileController::class, 'destroy']);
