<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;
use Illuminate\Validation\ValidationException;

class ProfileController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'first_name' => 'required|string|max:50',
                'last_name'  => 'required|string|max:50',
                'email'      => 'required|email|unique:profiles,email',
                'phone'      => 'nullable|string|max:15',
                'address'    => 'nullable|string|max:255',
            ]);

            $profile = Profile::create($validated);

            return response()->json([
                'message' => 'Profile created successfully!',
                'profile' => $profile
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong: '.$e->getMessage()
            ], 500);
        }
    }
}
