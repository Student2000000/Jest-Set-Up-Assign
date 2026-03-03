import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import TodoListManager from './index';

describe('TodoListManager', () => {
  it('renders initial input and add button', () => {
    const { getByPlaceholderText, getByTestId } = render(<TodoListManager />);
    
    expect(getByPlaceholderText('Enter Todo')).toBeTruthy();
    expect(getByTestId('add-todo-button')).toBeTruthy();
  });

  //Google and AI had to help me with this one :T
  //Googled test syntax for expo with react and ts. 
  //Asked AI to explain your test. 
  //Google AI told me I needed to make objects for the input/button so I could simulate them in the test. 
  it('adds a new enrty to the list when the button is pressed', () => {
    //modified the render stmnt from the example 
    const { getByTestId, getByText } = render(<TodoListManager />);

    //render the input and button to use in the sim
    const input = getByTestId('input-todo');
    const button = getByTestId('add-todo-button'); 

    //fake events that a user might make
    fireEvent.changeText(input, 'Finish my homework');

    //Preses the fake button
    fireEvent.press(button); 

    //There should be text in the list of tasks that reads 'finish my homework'
    expect(getByText('Finish my homework')).toBeTruthy();

  });

  //Had to google getbyText vs querybytext. I am learng alot today :T
  it('Removes an entry from the list when the button is pressed', () => {
    //used the render again
    const { getByTestId, getByText, queryByText } = render(<TodoListManager />);

    const input = getByTestId('input-todo');
    const button = getByTestId('add-todo-button'); 

    //making a task
    fireEvent.changeText(input, 'I will be deleted');

    //posting the task
    fireEvent.press(button); 

    //did it actually post? 
    expect(getByText('I will be deleted')).toBeTruthy();

    const deleteButton = getByText("Remove");

    //press delete!! >:D
    fireEvent.press(deleteButton); 

    //if the task's title is still there, somthing is wrong. 
    expect(queryByText('I will be deleted')).toBeFalsy();

  });

});