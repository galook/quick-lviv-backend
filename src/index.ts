import { Express } from "express";
import express, { Request, Response } from "express";
import admin from "firebase-admin";

const fapp = admin.initializeApp({   
    credential: admin.credential.cert({
        projectId: "quick-lviv",
        clientEmail: 'firebase-adminsdk-khelb@quick-lviv.iam.gserviceaccount.com',
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCYKsG01R7YPqdN\nUBVuJ8HsWCkvaBESMCBx3xyVg55ED0FG/yg0DgUgCEugswgAI0nDrfBg6ieRvPzl\nCGdBlKciVI3uqANGe/AWE0TJCPMLNV1UcP4mThiD2CZyNOi4jTWyOM3qn4GdhQJW\naJMEsdRoTkgI+6Od8plIg/g8bIvkVCK4cBqocUGsSdsOcdCkZLYXyUe3en21oCHk\niEJxQ/pC6O5eGAlEeJdQUDb2SKygp5FIePAZ5KsqTpLHvBwmrhQ2beC0/V3RyyVF\nwUqjfENNRW+Y0s8NDmXwSLwJPFIfa6CBFxfxwOWS/VTbKBperRGPr/pqPJYjhz0Q\nWdC1yY0/AgMBAAECggEAJdWjujmvZKcXZBLAcVYzUneNLftbG0GaH5YQ/l/ubw+3\n9FYnAeJmhdNqMnexSo97nMrX1NEDq6no222eduDmOZP6gleGEPVp+aMq3C18eNH4\n9bDukEmksMuCq6zaHGEH89tJ38dvK+JRdXik7Wrl3FVydcFTqkcSs8QUabm3grrC\nhHfA95HTm/VXVvtRXv9lhDptICIFoHqYhjd3DNJB7K5Arh9Uu0zha6Kuqn1Ec7Br\n66JGMZEM8ZvVKsP26iLP8La4+stgmiYOlQc+EMNfQVz3e5MvAKcpdTvdPyLxux/R\nwsRgEmz6izK4aBteyw2QOzbTAEsVkT9mYV3yQ1cqAQKBgQDKpLpEc12CNe7Ahwuw\nq7GLNQxAJwc6s4sRXgJPvkJAeXpMDNBG/ml+dGsZ+GyzE0L520ImJQ2as9+cGdAD\n1eZCVQhYmw72CopQOfJt9QAe/XZn7/vl+f3qEO3hB/8IVm1Eng/jUlp6ilE01MPB\nlR2atqfkghZ6etuGx0bAgTq9AQKBgQDAO6RIDhpf9mlhMF536btIHOIduQcZjm9a\nEYtRGSKEZ3GpFTAmBj/p3HmCJdfYCve5mII3id1TIIBbxBpqAftVNexs6g5mr6FY\nVgrLpsetR1ZceJ0ufD4W2Ukgbcd2dtntr27pe7ST2Lhip72dUy1pWyjSkgoFKAz7\nCZ2CNfMKPwKBgQC+e4Gr/lWTpGa9CzRt6baGiGLvmsAs6cB7nsbFdq6INKhE/HZ7\nhYJcn8pdKyviWOTIQNY5TPMwzIwRDCKAuHwtNgkWYQr7NIU3TIEZ4wcuGktHAErk\nrs2DTE6PDRkqGTO1IG8G2865CXO0GZu5SBX/7Fp9bdr7XqkkVAWpxtAUAQKBgQCM\nJG714OI1h4z3v61/OjTAs93c0WFtrjtbrGKmsu5JHKjuHXZGolPCCGvFCBW9ePF0\nqsxz9NwXmCA7xlGDawJx8qf0FwZ8shmsLr4cDfCQUOuS6pOcqhMR0ULQk3fQ04C5\nGSaArSDOkDaMJcHEijkXD9BJAxKvA63C7hWYMgCHPQKBgQC4ZKhV2H2S1t44zD0f\nLe9Nov8Z1Dm3of14tdSTlBy4VvTxeDLhrpGuZ1xxcSMmNMZhLTFupWPWe7s6sak4\nzer/k+g8GMWzEjsPWVYSnAd6NE+Vtx8nIPQDj3xJv8zmhn7hMI9WP9op7jyxQk2h\nMrzywi2/1/KqM78ViVIy/SqlzA==\n-----END PRIVATE KEY-----\n"
    }),
});
  
// create an express app and a few endpoints 
const app: Express = express();
const port = 3548;
const subscribers: string[] = [];
// json parser 
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.get('/webhoookAPI008ax', async (req: Request, res: Response) => {
    res.send('API endpoint');
    const response = await fapp.messaging().sendMulticast({
        notification: {
            title: "Air Alarm",
            body: "There has been a change",
        },
        tokens: subscribers

    })
    console.log(response);
    console.log(response.responses[0]?.error)
    
    
});
app.post('/subscribe', (req: Request, res: Response) => {
    console.log("Subscribing: ", req.body);
    if(req.body.id) {
        if(!subscribers.includes(req.body.id)) {
            subscribers.push(req.body.id)
            console.log("New subscriber: ", req.body.id);
        }
        console.log("No subscriber added");
        
    }
    console.log("Bad request");
    res.send("A")
    
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

