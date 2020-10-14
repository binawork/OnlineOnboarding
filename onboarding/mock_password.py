from xkcdpass import xkcd_password as xp


def prepare_data():
    """
    Prepare english words list with words between 5 and 8 sings long.
    """
    wordfile = xp.locate_wordfile()
    words = xp.generate_wordlist(wordfile=wordfile, min_length=5, max_length=8)
    return words


def generate():
    """
    Generate password with random words like e.g. 'unroll-greeter-audacity'.
    """
    words = prepare_data()
    password = xp.generate_xkcdpassword(words, numwords=3, delimiter="-")
    return password
