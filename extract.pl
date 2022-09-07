while (<>) {
  if (/^\d+\[10\]:\s*([A-La-l]+)/) {
      if (length($1) > 6) {
          print "$1\n";
      }
  }
}
