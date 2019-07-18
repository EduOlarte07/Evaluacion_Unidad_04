var Calculadora =
{
    Decimal : false,
    Limit : 8, Decimal : false,
    Limit : 8,
    Negative : false,
    Cero : 0,
    cont : 0,
    i : 0,
    sw : false,
    Number01 : 0,
    Number02 : 0,
    FinalResult : 0,
    InterResult : 0,
    temp : "",
    ActualOperation : "",
    LastOperation : "",
    Math_Functions : ["on","dividido", "por", "menos","mas","igual"],
    Math_Calculations : ["mas", "menos", "por","dividido"],
    Digits : ["1", "2", "3", "4", "5","6","7","8","9","0","sign","punto","."],
    KeyBoard : document.getElementsByClassName("teclado")[0],
    Screen : document.getElementById('display'),

    init: function()
    {
      this.Events()
    },

    Events: function()
    {
      this.KeyBoard.addEventListener('click', function()
      {

        if (Calculadora.Digits.indexOf(event.target.id) >= 0)
        {
            Calculadora.Screen_Write(event.target.id)
        }

        if (Calculadora.Math_Functions.indexOf(event.target.id) >= 0)
        {
            Calculadora.Math_Op(event.target.id)
        }

      })

      this.KeyBoard.addEventListener('mousedown', function()
      {
        Calculadora.efectohundir(event.target)
      })

      this.KeyBoard.addEventListener('mouseup', function()
      {
        Calculadora.efectolevantar(event.target)
      })

    },

    Screen_Write: function(key)
    {
        if (key == "punto")
        {
            if (!this.Decimal)
            {
                    this.Decimal = true;
                this.Limit++;
                key=".";
            }
            else
            {
                key="";
            }
        }
        if (key == "sign")
        {
            if (this.Screen.innerHTML !== "0")
            {
                if (!this.Negative)
                {
                    this.Negative = true;
                }
                else
                {
                    this.Negative = false;
                }
            }
            key="";
        }
        if (this.Digits.indexOf(key) >= 0 && this.temp.length < 8)
        {
            if (this.Screen.innerHTML == "0" && this.Digits.indexOf(key) <= 9)
            {
                this.Screen.innerHTML = key;
            }
            else
            {
                this.Screen.innerHTML = this.Screen.innerHTML + key
            }
        }
        this.Cero = this.Screen.innerHTML;
        if ((this.Negative && this.Cero > 0) || (!this.Negative && this.Cero < 0))
        {
            this.Cero *= - 1
        }
        this.Screen.innerHTML = this.Cero
        this.temp =  this.Screen.innerHTML.replace("-","")
        this.temp =  this.temp.replace(".","")
    },

    Screen_Init : function()
    {
        this.Decimal = false
        this.Limit = 8
        this.Negative = false
        this.Cero = 0
        this.temp = ""
        this.Screen.innerHTML = "0"
    },

    Calculate_Init : function()
    {
        this.ActualOperation = ""
        this.LastOperation = ""
        this.Number01 = 0
        this.Number02 = 0
        this.FinalResult = 0
        this.InterResult = 0
        this.temp = ""
        this.sw = false
    },

    Long_Check : function(cadena)
    {
        verif = ""
        verif =  cadena.toString().replace("-","")
        verif =  verif.toString().replace(".","")
        if (verif.length < 9)
        {
            return true
        }
        else
        {
            return false
        }
    },

    Math_Op : function(key)
    {
        if (key == "on")
        {
            Calculadora.Calculate_Init()
            Calculadora.Screen_Init()
        }

        if (Calculadora.Math_Calculations.indexOf(key) >= 0)
        {
            //sw=false;
            if (this.LastOperation == "")
            {
                this.LastOperation = key
                this.Number01 =  this.Screen.innerHTML
                this.InterResult = this.Number01
                Calculadora.Screen_Init()
            }
            else
            {
                if (this.Number02 !== 0)
                {
                    this.Number01 = this.InterResult
                }
                this.Number02 = this.Screen.innerHTML
                switch (this.LastOperation)
                {
                    case "mas":
                        this.InterResult = Number(this.Number01) + Number(this.Number02);
                        break
                    case "menos":
                        this.InterResult = Number(this.Number01) - Number(this.Number02);
                        break
                    case "por":
                        this.InterResult = Number(this.Number01) * Number(this.Number02);
                        break
                    case "dividido":
                        this.InterResult = Number(this.Number01) / Number(this.Number02);
                        break
                }
                this.LastOperation = key
                this.ActualOperation = key
                Calculadora.Screen_Init()
            }
        }

        if (key == "igual")
        {
            if (this.ActualOperation == "")
            {
                if (this.Number02 !== 0)
                {
                    this.Number01 = this.Screen.innerHTML
                }
                else
                {
                    this.Number02 = this.Screen.innerHTML
                }
            }
            else
            {
                this.Number01 = this.InterResult
                this.Number02 = this.Screen.innerHTML
            }

            switch (this.LastOperation)
            {
                case "mas":
                    this.FinalResult = Number(this.Number01) + Number(this.Number02);
                    break
                case "menos":
                    this.FinalResult = Number(this.Number01) - Number(this.Number02);
                    break
                case "por":
                    this.FinalResult = Number(this.Number01) * Number(this.Number02);
                    break
                case "dividido":
                    this.FinalResult = Number(this.Number01) / Number(this.Number02);
                    break
            }
            if (Calculadora.Long_Check(this.FinalResult))
            {
                this.Screen.innerHTML = this.FinalResult;
                if (!this.sw)
                {
                    this.InterResult =  this.Number02;
                    this.sw =  true
                }
            }
            else
            {
                this.temp = ""
                this.cont = 0
                this.i = 0
                while (this.cont < 8)
                {
                    if (this.FinalResult.toString().substring(this.i,this.i+1) !== "-" && this.FinalResult.toString().substring(this.i,this.i+1) !== ".")
                    {
                        this.cont++
                    }
                    this.temp = this.temp + this.FinalResult.toString().substring(this.i,this.i+1)
                    this.i++
                }
                this.Screen.innerHTML = this.temp
                alert("El resultado supera los ocho (8) caracteres")
            }
        }
    },

    efectohundir : function(key)
    {
        if (key.id.length > 0 )
        {
            key.style.transform = "scale(0.9)"
        }
    },


    efectolevantar : function(key)
    {
        if (key.id.length > 0 )
        {
            key.style.transform = "scale(1)"
        }
    }

}
Calculadora.init()
