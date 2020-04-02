using System;
using System.Net;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace WebUI
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate next;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var code = HttpStatusCode.InternalServerError;
            var message = exception.Message;

            switch (exception)
            {
                case NotFoundException _:
                    code = HttpStatusCode.NotFound;
                    break;
                case UnauthorizedException _:
                    code = HttpStatusCode.Unauthorized;
                    break;
                case BadRequestException _:
                    code = HttpStatusCode.BadRequest;
                    break;
                default:
                    message = "Something went wrong.";
                    break;
            }

            var result = JsonConvert.SerializeObject(new { message });
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;
            return context.Response.WriteAsync(result);
        }
    }
}
