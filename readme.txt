1. Landing Page

        Endpoint: /
        Method: GET
        Description: Renders the landing page with a list of all products.
        Query Parameters: None
        Response: Renders HTML view with product list.


2. Create Product

        Endpoint: /new
        Method: GET
        Description: Renders a form for creating a new product.
        Query Parameters: None
        Response: Renders HTML view with a form for creating a new product.
        Endpoint: /new
        Method: POST
        Description: Creates a new product with the provided details.
        Request Body: JSON containing product details (title, description, status).
        Response: Redirects to the landing page after creating the product.

3. Show Product

        Endpoint: /show/:productId
        Method: GET
        Description: Displays details of a specific product.
        Path Parameters: productId (ID of the product to be shown)
        Response: Renders HTML view with product details.


4. Edit Product

        Endpoint: /edit/:productId
        Method: GET
        Description: Renders a form to edit details of a specific product.
        Path Parameters: productId (ID of the product to be edited)
        Response: Renders HTML view with a form to edit product details.
        Endpoint: /edit/:productId
        Method: POST
        Description: Updates details of a specific product.
        Path Parameters: productId (ID of the product to be edited)
        Request Body: JSON containing updated product details (title, description, status).
        Response: Redirects to the product details page after updating.

5. Delete Product

        Endpoint: /delete/:productId
        Method: GET
        Description: Deletes a specific product.
        Path Parameters: productId (ID of the product to be deleted)
        Response: Redirects to the landing page after deletion.

6. Error Handling

        Endpoint: * (Wildcard)
        Method: GET
        Description: Redirects to the landing page for any other invalid routes.
        Response: Redirects to the landing page.

7. Error Handling Middleware

        Description: Handles internal server errors and logs them.
        Response: Sends a 500 Internal Server Error response.

    Error Handling
        If an error occurs during the processing of a request, the server responds with an error message in the response body. 
        The error message is encapsulated within an alert element with the class alert-danger for styling purposes.

    Success Handling
        If the request is successfully processed, the server responds with a success message in the response body.
        The success message is encapsulated within an alert element with the class alert-success for styling purposes.

8. Server Startup

        Description: Starts the server on port 8080.
        Response: Logs a message indicating the server is listening on port 8080.