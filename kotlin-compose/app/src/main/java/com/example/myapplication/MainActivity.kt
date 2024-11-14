package com.example.myapplication

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.compose.ui.tooling.preview.Preview
import com.example.myapplication.ui.theme.MyApplicationTheme
import androidx.compose.runtime.remember
import androidx.compose.runtime.mutableStateOf


class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyApplicationTheme {
                Scaffold(
                    modifier = Modifier.fillMaxSize(),
                    topBar = { GreenTopBar() }
                ) { innerPadding ->
                    MainContent(Modifier.padding(innerPadding))
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GreenTopBar() {
    TopAppBar(
        title = { Text("Example 1") },
        colors = TopAppBarDefaults.topAppBarColors(containerColor = Color(0xFF00C853))
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainContent(modifier: Modifier = Modifier) {
    Column(
        modifier = modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Top
    ) {

        Spacer(modifier = Modifier.height(32.dp))


        // Circular Image
        Image(
            painter = painterResource(id = R.drawable.circle),
            contentDescription = "Circular Image",
            contentScale = ContentScale.Crop,
            modifier = Modifier
                .size(150.dp)
                .padding(8.dp)
        )

        Spacer(modifier = Modifier.height(32.dp))

        // Button Grid
        Column {
            Row(horizontalArrangement = Arrangement.SpaceEvenly, modifier = Modifier.fillMaxWidth()) {
                Button(
                    onClick = { /* no functionality */ },
                    colors = ButtonDefaults.buttonColors(containerColor = Color.Gray)
                ) {
                    Text("BUTTON")
                }
                Button(
                    onClick = { /* no functionality */ },
                    colors = ButtonDefaults.buttonColors(containerColor = Color.Gray)
                    )
                { Text("BUTTON") }
            }
            Spacer(modifier = Modifier.height(8.dp))

            Row(horizontalArrangement = Arrangement.SpaceEvenly, modifier = Modifier.fillMaxWidth()) {
                Button(
                    onClick = { /* no functionality */ },
                    colors = ButtonDefaults.buttonColors(containerColor = Color.Gray)
                    ) { Text("BUTTON")
                }
                Button(
                    onClick = { /* no functionality */ },
                    colors = ButtonDefaults.buttonColors(containerColor = Color.Gray)
                    )
                { Text("BUTTON") }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Email Input Field
        var email = remember { mutableStateOf("") }
        OutlinedTextField(
            value = email.value,
            onValueChange = { email.value = it },
            label = { Text("Email") },
            singleLine = true,
            modifier = Modifier.fillMaxWidth(0.8f),
            colors = TextFieldDefaults.outlinedTextFieldColors(
                focusedBorderColor = Color.Magenta,
                cursorColor = Color.Magenta
            )
        )
    }
}


