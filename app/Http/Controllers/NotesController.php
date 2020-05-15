<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Note;
use App\User;

class NotesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Note[]|\Illuminate\Database\Eloquent\Collection
     */
    public function index($userId)
    {
        return Response(User::find($userId)->notes()->get(), 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $id = $request->get('userId');
        $note = new Note([
            'title' => $request->get('title'),
            'description' => $request->get('description'),
            "user_id" => $request->get('userId'),
        ]);
        $note->save();
        return Response(User::find($id)->notes()->get(),200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($userId, $noteId)
    {
        $noteId = Note::findOrFail($noteId);
        $noteId->delete();
        return Response(User::find($userId)->notes()->get(),200);
    }
}
