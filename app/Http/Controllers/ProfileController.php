<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;

class ProfileController extends Controller
{
    // GET all profiles
    public function index()
    {
        return response()->json(Profile::all());
    }

    // POST create a profile
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required',
            'last_name'  => 'required',
            'email'      => 'required|email|unique:profiles',
            'phone'      => 'required',
            'address'    => 'required'
        ]);

        $profile = Profile::create($validated);

        return response()->json([
            'message' => 'Profile created successfully',
            'profile' => $profile
        ], 201);
    }

    // DELETE profile
    public function destroy($id)
    {
        $profile = Profile::findOrFail($id);
        $profile->delete();

        return response()->json(['message' => 'Profile deleted successfully']);
    }

    // PUT update profile
    public function update(Request $request, $id)
    {

        // Find profile by ID
        $profile = Profile::findOrFail($id);
        
        // ✅ Validate updated data
        $validated = $request->validate([
            'first_name' => 'required',
            'last_name'  => 'required',
            'email'      => 'required|email|unique:profiles,email,' . $id, // ignore current profile's email
            'phone'      => 'required',
            'address'    => 'required'
        ]);


        // Update with validated data
        $profile->update($validated);

        return response()->json([
            'message' => 'Profile updated successfully!',
            'profile' => $profile
        ], 200);
    }
}
